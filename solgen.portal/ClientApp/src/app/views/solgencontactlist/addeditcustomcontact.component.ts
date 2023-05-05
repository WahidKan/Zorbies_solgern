import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';
import { CommonService, ModuleList } from '../shared/common.service';
import { CustomContactListService, JsonData, CheckboxData } from './customcontactlist.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { filter } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ScriptService } from '../shared/scriptservice.service';
import { Location } from '@angular/common';
import { UserService, ForgotPassword } from '../shared/user.service';
declare var google: any;

@Component({
  selector: 'app-addeditcustomcontact',
  templateUrl: './addeditcustomcontact.component.html',
  styleUrls: ['./addeditcustomcontact.component.scss']
})

export class AddeditcustomcontactComponent implements OnInit {
  @ViewChild('mapLocation', { static: false }) mapLocation: ModalDirective;
  geocoder: any;
  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;
  emailDuplicated: any;
  moduleName = 'crm';
  submoduleName = 'contact';
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  isMapped: any;
  sDtaa: any;
  loadSave = false;
  Id: any = '';
  isLead = false;
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  JsonData: JsonData = new JsonData();
  userId: any;
  addedEmial: any
  addOrUpdatePermission: boolean = false;
  //modulePermission: ModuleList;
  leadId: any = 0;
  islead: boolean = false;
  accountid: any;
  solgenAccountId: any;
  userType: any;
  isaccount: boolean = false;
  opportunityid: any;
  isopportunity: boolean = false;
  isBanker: boolean = false;
  isAdd: boolean = true;
  isUpdate: boolean = true;
  private previousUrl = [];
  currentUrl: string = null;
  displayType = 'ADD';
  modulePermission: any[] = [];
  solgenpower: boolean = false;
  companyType: any;
  issolgen: any = '';
  scrollDataList: any;
  custom_field_id: any;
  len: any = 10;
  field_code: any;
  searchText: string;
  //isAdd: boolean = false;

  forgotPswModel: ForgotPassword = new ForgotPassword();

  sitetitle: string = '';
  siteURL: string = "";
  url: string = "";
  urldata: any;
  siteimage: string;
  emailControlName: string = "";
  RoleControlName: string = "";
  isDealerUser: boolean = false;
  emailFormName: string = '';
  executionFlow: any[] = [];
  userName: any;

  constructor(private fb: FormBuilder, private customContactlistService: CustomContactListService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService, private dialogService: ConfirmationDialogService, private script: ScriptService, private location: Location, private userServicepassword: UserService) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {

      if (userdetail.userType == "usertypedealer") {
        this.isDealerUser = true;
      }

      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.userType = userdetail.userType;
      this.companyType = userdetail.companyType;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
      if (this.companyType == "companytypeSolarInstall") {
        this.solgenpower = true;
      }

    });


    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    //let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    //if (add == undefined) {
    //  this.addOrUpdatePermission = false;
    //} else {

    //  this.addOrUpdatePermission = true;
    //}



    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CONTACTADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CONTACTUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }
    //alert(this.route.routeConfig.path);
    if (this.route.routeConfig.path == 'addContact/:eid') {
      this.islead = true;

    } if (this.route.routeConfig.path == 'addContact/account/:aid') {
      this.isaccount = true;

    } if (this.route.routeConfig.path == 'addContact/opportunity/:oid') {
      this.isopportunity = true;

    }

  }



  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {
    this.script.load("map");

    setTimeout(() => {
      this.autotext();
    }, 1000);
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        const eid = params.get('eid');
        const aid = params.get('aid');
        const oid = params.get('oid');
        this.solgenAccountId = params.get('account');
        this.issolgen = params.get('issolgen');

        this.leadId = eid;
        this.accountid = aid;
        this.opportunityid = oid;
        if (id) {
          this.loadSave = true;
          this.Id = id;
          this.pageTitle = 'Edit Contact';
          this.displayType = 'EDIT';
          //this.fillLeadForm(this.Id);
        }
        else {
          this.loadSave = true;
          this.displayType = 'ADD'
          this.pageTitle = 'Add Contact';
          ;
        }
      }

    );


    this.url = window.location.href;
    this.url = this.url.slice(9, 19);
    this.userServicepassword.GetSiteURl(this.url).subscribe((result: any) => {
      this.urldata = JSON.parse(result);

      if (result != null) {
        this.siteimage = this.urldata[0].SiteLoginLogo;
        this.sitetitle = this.urldata[0].SiteTitle;
        // this.setTitle(this.sitetitle);
      }
      else {
        this.sitetitle = 'SolgenOne'
        //     this.setTitle(this.sitetitle);
        this.siteimage = 'assets/default-theme/imagesNew/login-logo-solgen.png';
      }

    });

    if (this.userType == "usertypebanker") {//|| this.userType =='usertypecompanyadmin'  remove by aakash and deepanshu


      this.isaccount = true;
      if (this.commonService.getQueryStringValue("account") != null)
        this.accountid = this.commonService.getQueryStringValue("account");

    }

    let aic = this.Id;
    if (aic == '') {
      aic = this.accountid;
    }

    if (this.route.routeConfig.path == 'addContact/:eid') {
      this.islead = true;

    } if (this.route.routeConfig.path == 'addContact/account/:aid') {
      this.isaccount = true;

    }
    if (this.route.routeConfig.path == 'addContact/opportunity/:oid') {
      this.isopportunity = true;

    }

    this.customContactlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, aic, this.displayType).subscribe((result: any) => {
      if (result) {
        
        this.customCompnentValues = this.customContactlistService.customFieldsList.data;
        this.executionFlow = this.customContactlistService.customFieldsList.executionFlow;
        console.log("valuessssssssss",this.customCompnentValues);
        let fieldArray = [];
        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (t.name == 'Email') {
            ;
            this.addedEmial = t.value;
          }
          if (t.dt_code == 'select' && t.select_options != null && (t.name == 'CreatedById' || t.name == 'LastModifiedById')) {       
            if (t.value != '') {
              debugger;
              t.value = t.value.toLowerCase();
              t.select_options.forEach(itemList => {
                if (itemList.value == t.value) {
                  t.value = itemList.name;
                  t.dt_code = 'text';
                  t.is_readOnly = true;
                }
              });
            } else {
              t.value = t.value.toLowerCase();
              t.dt_code = 'text';
              t.is_readOnly = true;
            }
          }

          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }

            this.formControlList.push(obj);
            //for (let config of this.formControlList) {

            //}
          }
        })
        const group: any = {};
        data_type_name: Text
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          } else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          if (this.accountid > 0 && cnt.dt_code == 'select' && cnt.field_code == 'ACCOUNT_NAME') {
            val = this.accountid;
            if (this.isaccount) {
              cnt.is_readonly = false;
            }

          }
          if (this.leadId > 0 && cnt.dt_code == 'select' && cnt.field_code == 'ACCOUNT_NAME') {
            cnt.is_required = null;
          }

          if (this.displayType == 'ADD' && cnt.name == 'OwnerId' && cnt.dt_code == 'select' && cnt.select_options != null) {
            cnt.select_options.forEach(itemList => {
              if (itemList.name == this.userName) {
                val = itemList.value;
                //cnt.is_readOnly = true;
              }
            });
          }
          //------show Role dropdown for Dealer


          if (cnt.dt_code == 'select' && cnt.field_code == 'Contact_Role') {
            this.RoleControlName = cnt.form_controlName;

            if (cnt.value == "" || cnt.value == null) {
              cnt.is_required = false;
              cnt.form_field_visibility = 'NO'
              cnt.edit_form_field_visibility = 'NO'
            } else {
              cnt.is_required = true;
              cnt.form_field_visibility = 'YES'
              cnt.edit_form_field_visibility = 'YES'
            }
            let index = window.location.href.indexOf("?account=")
            // if ((typeof cnt.value != undefined && cnt.value != "0" && cnt.value != "") || this.isaccount) {
            if (index > 0 || this.isaccount) {
              cnt.is_required = true;
              cnt.form_field_visibility = 'YES'
              cnt.edit_form_field_visibility = 'YES'
            }
          }
          if (cnt.name == "Email") {
            this.emailControlName = cnt.form_controlName;
          }
          
          if (cnt.ColumnName == 'ContactRoleId') {
            cnt.form_field_visibility = 'NO';
            cnt.edit_form_field_visibility = 'NO';
          }
          if (cnt.ColumnName == "Email") {
            this.emailFormName = cnt.form_controlName
          }

          //------



          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }

          // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
          //if (typeof this.form != 'undefined') {
          //  if (cnt.name == 'Email' && this.Id > 0) {
          //   // if (this.form.controls['295_Email']) {
          // this.form.controls['295_Email'];
          //  //  }
          //  }
          //}
        });

        this.form = new FormGroup(group);
        //if (this.Id > 0) {
        // this.form.controls['295_Email'].disable();

        //}
        console.log(this.customCompnentValues)
        this.loadSave = false;
      }
    });
  }

  numberOnly(event): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  checkvalue(formvalues, selval) {
    let returnValue = false;
    if (formvalues != null) {
      formvalues.split(',').find((item) => {
        if (item == selval) {
          returnValue = true;

        }
      });
    }
    return returnValue;
  }
  test(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  OnCheck() {
  }
  onSubmit() {
    ;
    this.checkboxdata1.forEach((item) => {
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";// this.form.get(item.controlname).value;
        if (selvalues == "" || selvalues == null) {
          this.form.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.form.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });
    var email=this.form.get(this.formControlList[0].InnerData.filter(x => x.label == 'Email')[0].form_controlName).value
    if (this.addedEmial != email)  {
      this.commonService.isValueDuplicate(1, this.form.get(this.formControlList[0].InnerData.filter(x => x.label == 'Email')[0].form_controlName).value).subscribe((response: any) => {
        if (response.response == 1) {
          ;
          this.emailDuplicated = response;
          this.toaster.error('Email Already Present Please change');
        }
        else {
          this.emailDuplicated = response;
          this.ValidFormSubmit()
        }
      })
    }
    else{
      this.ValidFormSubmit();
    }

  }
  ValidFormSubmit() {
    if (this.form.valid && (this.emailDuplicated == null || this.emailDuplicated.response == 0)) {

      this.loadSave = true;
      this.JsonData.Id = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      this.JsonData.FormJsonData = JSON.stringify(this.form.value);
      let checkEmail = this.form.controls[this.emailFormName].value;

      let selectedRole = 0;
      if (this.form.controls[this.RoleControlName] != undefined) {
        selectedRole = this.form.controls[this.RoleControlName].value;
      }
      if (this.Id == null || this.Id == '') {
        // console.log('checkEmail', checkEmail);
        this.customContactlistService.CheckUserDuplicateORAssociate(checkEmail).subscribe((result: any) => {
          if (result.responseMessage == "duplicate") {
            this.loadSave = false;
            this.MapContact();

          }
          else if (result.responseMessage == "associate") {
            this.loadSave = false;
            this.dialogService.confirm('Associate Contact', "Email already exists in other Company. Do you want to Associate it?").subscribe(confirmed => {
              if (confirmed) {
                this.customContactlistService.addEditForm(this.JsonData, this.leadId, this.accountid, this.opportunityid).subscribe((result: any) => {
                  if (result.statusCode == 200) {
                    //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
                    //this.toaster.success(result.responseMessage);

                    // this.sendPasswordLink(selectedRole, checkEmail);
                    ;
                    let primaryId = Number(result.optionalExtraParamers);
                    let flowsList = this.executionFlow.filter(x => x.FlowType == "AutolaunchedFlow");
                    if (flowsList.length > 0) {
                      flowsList.forEach((item) => {
                        window.open(`/automation-flow-execution/execution/${item.automationFlowId}/${primaryId}`, "_blank");
                      });
                    }
                    this.toaster.success(result.responseMessage);
                    this.loadSave = false;
                    this.close();
                    //setTimeout(() => {
                    //  this.toaster.success(result.responseMessage);
                    //  this.loadSave = false;
                    //  this.close();
                    //}, 1000);
                  }
                  else {
                    this.toaster.error(result.responseMessage);
                    this.loadSave = false;
                  }
                }, error => {
                  this.loadSave = false;
                });
              }
              else {
                this.loadSave = false;
              }
            });
          }
          else {
            this.customContactlistService.addEditForm(this.JsonData, this.leadId, this.accountid, this.opportunityid).subscribe((result: any) => {
              if (result.statusCode == 200) {
                //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
                //this.toaster.success(result.responseMessage);
                ;
                let primaryId = Number(result.optionalExtraParamers);
                let flowsList = this.executionFlow.filter(x => x.FlowType == "AutolaunchedFlow");
                if (flowsList.length > 0) {
                  flowsList.forEach((item) => {
                    window.open(`/automation-flow-execution/execution/${item.automationFlowId}/${primaryId}`, "_blank");
                  });
                }
                this.sendPasswordLink(selectedRole, checkEmail);

                this.toaster.success(result.responseMessage);
                this.loadSave = false;
                this.close();

                //setTimeout(() => {
                //  this.toaster.success(result.responseMessage);
                //  this.loadSave = false;
                //  this.close();
                //}, 1000);
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
      else {
        this.customContactlistService.addEditForm(this.JsonData, this.leadId, this.accountid, this.opportunityid).subscribe((result: any) => {
          if (result.statusCode == 200) {
            ;
            let primaryId = Number(result.optionalExtraParamers);
            let flowsList = this.executionFlow.filter(x => x.FlowType == "AutolaunchedFlow");
            if (flowsList.length > 0) {
              flowsList.forEach((item) => {
                window.open(`/automation-flow-execution/execution/${item.automationFlowId}/${primaryId}`, "_blank");
              });
            }
            //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
            //this.toaster.success(result.responseMessage);

            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.close();
            //setTimeout(() => {
            //  this.toaster.success(result.responseMessage);
            //  this.loadSave = false;
            //  this.close();
            //}, 1000);
          }
          else {
            this.toaster.error(result.responseMessage);
            this.loadSave = false;
          }
        }, error => {
          this.loadSave = false;
        });
      }
    }
    else {
      this.commonService.validateAllFormFields(this.form);
      this.loadSave = false;

    }
  }
  MapContact() {
    const message = `Contact Already  mappped with other Account, You still want to Continue ?`;
    this.dialogService.confirm('Map Account', message).subscribe((confirmed) => {
      if (confirmed) {
        var emial = this.form.get(this.formControlList[0].InnerData.filter(x => x.label == 'Email')[0].form_controlName).value
        var AccountId = this.form.get(this.formControlList[0].InnerData.filter(x => x.label == 'AccountId')[0].form_controlName).value
        
        this.commonService.contactAccountMapping(AccountId, emial).subscribe((response: any) => {
          if (response.responseMessage == 'Account Mapped') {
            this.toaster.success(response.responseMessage);
          }
          else
            this.toaster.error(response.responseMessage);

        });
      }

    });
  }
  sendPasswordLink(selectedRole, checkEmail) {

    if (this.Id == "" && selectedRole != null && selectedRole != 0) {//Role is selected so send mail for enable login.
      this.forgotPswModel.email = checkEmail;
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
  }

  displayInsuranceDetail(reposnse): void {
    const formGroup = {};
    for (let prop of Object.keys(this.customCompnentValues)) {
      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
    }
    this.form = new FormGroup(formGroup);
  }

  close() {
    if (this.islead == true) {
      if (this.solgenpower == true) {
        this.router.navigate(['../lead/view', this.leadId]);
      }

      else {
        this.router.navigate(['../lead/viewlead', this.leadId]);
      }

    }
    else if (this.isaccount == true) {
      this.router.navigate(['../accountslist/viewaccount', this.accountid]);
      //this.router.navigate(['../accountslist/view', this.accountid]);
    }
    else if (this.isopportunity == true) {
      if (this.solgenpower == true) {
        this.router.navigate(['../opportunity/viewOpportunity', this.opportunityid]);
      }
      else {
        this.router.navigate(['../opportunity/view', this.opportunityid]);
      }
    }
    else if (this.issolgen == 'true') {
      this.router.navigate(['../accountslist/view', this.solgenAccountId]);
      //accountslist / view / 46452
    }
    else {
      this.location.back();

      //this.router.navigateByUrl("/contactlist");
    }

  }



  //      this.form = new FormGroup(formGroup);
  //      this.loadSave = false;

  //    }
  //  },
  //    (error: any) => {
  //      this.loadSave = false;
  //    })

  //}

  fillLeadForm(id) {

    this.customContactlistService.GetSolgenContactDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe((result: any) => {
      let edit: any
      edit = this.customContactlistService.editPage.data[0];
      //let empty = null;
      const formGroup = {};
      if (result) {
        Object.keys(edit).forEach(t => {
          let cntname = t;
          let cntValue = edit[t] == '' ? null : edit[t];

          if (cntValue !== null && cntValue.indexOf("[") !== -1 && cntValue.indexOf("]") !== -1) {

            cntValue = JSON.parse(cntValue);
          }
          if (cntValue !== null && (cntValue == 'true' || cntValue == 'false')) {

            cntValue = (cntValue == 'true');
          }

          this.checkboxdata1.forEach((item) => { if (cntname == item.controlname) { item.controlvalues = cntValue; } });//for checkboxes on form
          formGroup[cntname] = new FormControl(cntValue);
        })

        // this.form.value.reset();
        this.form = new FormGroup(formGroup);


        //for checkboxes on form
        try {
          this.checkboxdata1.forEach((item) => {
            this.form.get(item.controlname).setValue(item.controlvalues.split(','));
          });
          //this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });

        }
        catch (err) { }
        this.loadSave = false;

      }
    },
      (error: any) => {
        this.loadSave = false;
      })

  }
  MakeArray(value, type) {
    var array = [];
    var arr = String(value).split(',');
    if (type == "radio" || type == "checkbox") {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].split("|").length > 1) {
            var person = { name: arr[i].split("|")[0], value: arr[i].split("|")[1] };
            array.push(person);
          }
          else {
            var person = { name: arr[i], value: arr[i] };
            array.push(person);
          }
        }
      }
    }
    else {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          var person = { name: arr[i], value: arr[i] };
          array.push(person);
        }
      }
    }

    return array;
  }


  MakeNormalArray(value) {
    if (value) {
      try {
        return JSON.parse(value);
      }
      catch (ex) {
        return value;
      }
    }
    else {
      value = [];
    }
  }
  MakeSelectArray(objItem) {
    var array = [];
    var arr = String(objItem.select_options).split(',');
    if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {

      var person = { name: arr[0], value: arr[1] };
      array.push(person);
      //objItem.select_options = array;
    }
    return array
  }
  removeValue = function (list, value, separator) {
    separator = separator || ",";
    var values = list.split(separator);
    for (var i = 0; i < values.length; i++) {
      if (values[i] == value) {
        values.splice(i, 1);
        return values.join(separator);
      }
    }
    return list;
  }


  onCheckboxChange(e, groupdisp, controldisp) {
    //const index2: number = this.formControlList.indexOf(groupdisp);
    //const index1: number = controldisp.display_order;

    let checkboxdatanew = new CheckboxData();
    checkboxdatanew.controlname = controldisp.ColumnName;
    if (e.target.checked) {
      let strvalues = "";
      if (this.checkboxdata1.length > 0) {
        strvalues = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName).controlvalues;
      }
      if (strvalues == "") {
        checkboxdatanew.controlvalues = e.target.labels[0].innerHTML;
        this.checkboxdata1.push(checkboxdatanew);
      } else {
        let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName);
        let index = this.checkboxdata1.indexOf(updateItem);
        this.checkboxdata1[index].controlvalues = strvalues + "," + e.target.labels[0].innerHTML;


      }


      //  if (this.formControlList[index2].InnerData[index1].value == "") {
      //    this.formControlList[index2].InnerData[index1].value = e.target.labels[0].innerHTML;

    }
    else {

      let strs = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName).controlvalues.split(",");

      let updatedval = strs.splice(strs.indexOf(e.target.labels[0].innerHTML), 1);
      //checkboxdatanew.controlvalues = updatedval.toString();
      let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName);
      let index = this.checkboxdata1.indexOf(updateItem);
      this.checkboxdata1[index].controlvalues = strs.toString();
      //this.checkboxdata1.push(checkboxdatanew);
      //    this.formControlList[index2].InnerData[index1].value = this.formControlList[index2].InnerData[index1].value + "," + e.target.labels[0].innerHTML;
    }
    //}
    //else {
    //  this.formControlList[index2].InnerData[index1].value=this.removeValue(this.formControlList[index2].InnerData[index1].value, e.target.labels[0].innerHTML, ',');
    //}
    var dd = this.formControlList;

  }

  //onClearLang(dataList: any, j: number): void {
  //  this.len = 0
  //  this.custom_field_id = dataList[j].custom_field_id;
  //  this.field_code = dataList[j].field_code;
  //  this.searchText = '';
  //  this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
  //    this.scrollDataList = this.commonService.customFieldsListData;
  //    (dataList[j].select_options as any[]) = this.scrollDataList;
  //  })
  //}


  onScrollToEnd(dataList: any, j: number) {
    this.fetchMore(dataList, j);
  }

  private fetchMore(dataList: any, j: number) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList[j].select_options.length;
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;
    let data = (dataList[j].select_options as any[]);
    //this.len = this.getreturnNumber(this.len = 10, dataList[j].select_options.length);
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      (dataList[j].select_options as any[]) = (dataList[j].select_options as any[]).concat(this.scrollDataList);

    })
  }

  onKey(e: any, dataList: any, j: number) {
    this.len = 0
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;
    this.searchText = e.target.value;
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      (dataList[j].select_options as any[]) = this.scrollDataList;
    })
  }

  onClearLang(dataList: any, j: number): void {
    this.len = 0
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;
    this.searchText = '';
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      (dataList[j].select_options as any[]) = this.scrollDataList;
    })
  }
  getreturnNumber(x, y) {
    return x + y;
  }
  mapPopUP() {
    this.mapLocation.show();
  }
  closemapsearch() {
    this.mapLocation.hide();
  }
  autotext() {


    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {

        center: { lat: 50.064192, lng: -130.605469 },
        zoom: 3,
      }
    );
    const card = document.getElementById("pac-card") as HTMLElement;
    const input = document.getElementById("pac-input") as HTMLInputElement;
    const countries = document.getElementById("country-selector") as HTMLElement;

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    const autocomplete = new google.maps.places.Autocomplete(input);

    // Set initial restrict to the greater list of countries.
    autocomplete.setComponentRestrictions({
      country: ["us"],
    });

    // Specify only the data fields that are needed.
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById(
      "infowindow-content"
    ) as HTMLElement;
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);
      const place = autocomplete.getPlace();
      if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
      //this.findLocation(place);

        ;
      if (place.address_components) {
        this.customCompnentValues.forEach(t => {
          try {
            if ((t.dt_code == 'select' && t.select_options != null && t.name == 'Country') || (t.dt_code == 'select' && t.select_options != null && t.name == 'State')) {
              this.form.get(t.form_controlName).setValue(null);
            }
            if (t.name == 'PostalCode' || t.name == 'City' || t.name == 'Street') {

              this.form.get(t.form_controlName).setValue('');
            }
            let route: string = '';
            let street: string = '';
            place.address_components.forEach(p => {
              
              p.types.forEach(s => {
                if (s == 'country') {
                  if (t.dt_code == 'select' && t.select_options != null && t.name == 'Country') {
                    try {
                      t.select_options.forEach(itemList => {
                        let cntryname = p.long_name;
                        if (itemList.name == cntryname) {
                          this.form.get(t.form_controlName).setValue(itemList.value);
                        }
                      });
                    } catch { }
                  }
                }
                if (s == 'administrative_area_level_1') {

                  if (t.dt_code == 'select' && t.select_options != null && t.name == 'State') {
                    try {

                      t.select_options.forEach(itemList => {
                        let statename = p.long_name;
                        if (itemList.name == statename) {
                          this.form.get(t.form_controlName).setValue(itemList.value);
                        }
                      });
                    } catch { }
                  }
                }
                if (s == 'postal_code') {
                  if (t.name == 'PostalCode') {

                    this.form.get(t.form_controlName).setValue(p.long_name);
                  }


                }
                if (s == 'locality') {
                  if (t.name == 'City') {

                    this.form.get(t.form_controlName).setValue(p.long_name);
                  }
                }
                if (s == 'street_number') {
                  street = p.long_name
                }
                if (s == 'route') {
                  route = p.long_name
                }
              })


            })

            if (t.name == 'Street') {
              var street_value = street + ' ' + route;
              this.form.get(t.form_controlName).setValue(street_value);
            }
          } catch { }


          this.closemapsearch();
        });

      }






      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17); // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      let address = "";

      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
          "",
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
          "",
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
          "",
        ].join(" ");
      }

      //infowindowContent.children["place-icon"].src = place.icon;
      //infowindowContent.children["place-name"].textContent = place.name;
      //infowindowContent.children["place-address"].textContent = address;
      //infowindow.open(map, marker);
    });

    // Sets a listener on a given radio button. The radio buttons specify
    // the countries used to restrict the autocomplete search.
    //function setupClickListener(id, countries) {
    //  const radioButton = document.getElementById(id) as HTMLElement;
    //  radioButton.addEventListener("click", () => {
    //    autocomplete.setComponentRestrictions({ country: countries });
    //  });
    //}

    //setupClickListener("changecountry-usa", "us");
    //setupClickListener("changecountry-usa-and-uot", [
    //  "us",
    //  "pr",
    //  "vi",
    //  "gu",
    //  "mp",         
    //]);
  }


  getRoles(e?, formControlList?) {
    if (e != undefined) {
      this.commonService.CheckAccountTypeIsDealer(e.value).then(resp => {
        if (resp) {

          this.commonService.GetDDLItemsForRole('Contact_Role', e.value).then(resp => {
            // console.log('Role DDL resp', resp);
            if (resp) {
              var data = JSON.parse(resp.toString());

              formControlList.forEach(function (t1) {
                let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
                groupCheck[0].InnerData.forEach(function (t) {
                  if (t.ColumnName == 'AccountId') {
                    return;
                  }
                  t.form_field_visibility = 'YES';
                  t.edit_form_field_visibility = 'YES';

                  if (t.ColumnName == 'ContactRoleId') {
                    t.is_required = true;
                    t.form_field_visibility = 'YES';
                    t.edit_form_field_visibility = 'YES';
                    t.select_options = data;
                  }
                });
              });


            }
          }).catch(err => { console.log(err) });
        } else {
          formControlList.forEach(function (t1) {
            let groupCheck = formControlList.filter(y => y.group_id == t1.group_id);
            groupCheck[0].InnerData.forEach(function (t) {
              if (t.ColumnName == 'AccountId') {
                return;
              }
              t.form_field_visibility = 'YES';
              t.edit_form_field_visibility = 'YES';

              if (t.ColumnName == 'ContactRoleId') {
                t.is_required = false;
                t.form_field_visibility = 'NO'
                t.edit_form_field_visibility = 'NO'
                t.select_options = null;
              }
            });
          });
        }


      }).catch(err => { console.log(err) });
    }




  }

}
