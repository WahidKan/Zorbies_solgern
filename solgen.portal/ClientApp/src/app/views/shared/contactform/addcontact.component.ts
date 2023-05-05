import { Component, Input, OnInit, Output, ViewChild, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, CheckboxData, JsonData } from '../common.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ScriptService } from '../scriptservice.service';
import { BulletsAndNumberingDialogService } from '@syncfusion/ej2-angular-documenteditor';
declare var google: any;

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html'
})

export class AddcontactComponent implements OnInit, OnChanges {
  @Output() refreshOpportunityRelatedtab = new EventEmitter();
  @ViewChild('mapLocation', { static: false }) mapLocation: ModalDirective;
  @ViewChild('addContact', { static: false }) addContact: ModalDirective;
  @Input('newItemEvent') newItemEvent: any;
  @Input('Usertype') Usertype: any = '';

  @Output() contactemit = new EventEmitter<boolean>();
  @Output() closePopup = new EventEmitter<boolean>();
  @Input('oppid') oppid: number;
  @Input('leadId') leadId: number;
  @Input('islead') islead: any;
  @Input('accountId') accountId: any;//isAccount
  @Input('isAccount') isAccount: any;
  @Input('solgenpower') solgenpower: any;
  @Input('opprAccountId') opprAccountId: any;
  @Input('contactId') contactId: any;
  @Input('ownerId') ownerId: any;
  @Input('forAccount') forAccount: boolean = false;

  geocoder: any;
  @Output() onAdd = new EventEmitter();
  @Input() delayLoading = false;
  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;
  moduleName = 'crm';
  submoduleName = 'contact';
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  sDtaa: any;
  isEmailDuplicated: any
  //isaccount = false;
  loadSave = false;
  Id: any = '';
  internalleadId: any;
  isLead = false;
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  JsonData: JsonData = new JsonData();
  userId: any;
  addOrUpdatePermission: boolean = false;
  //modulePermission: ModuleList;
  //islead: boolean = false;
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

  companyType: any;
  issolgen: any = '';
  scrollDataList: any;
  custom_field_id: any;
  len: any = 10;
  field_code: any;
  searchText: string;
  callFrom: string = '';
  callFromId: number = 0;



  constructor(private fb: FormBuilder, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService, private dialogService: ConfirmationDialogService, private script: ScriptService) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      // console.log('userdetail', userdetail)

      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.userType = userdetail.userType;
      this.companyType = userdetail.companyType;
      if (this.companyType == "companytypeSolarInstall") {
        this.solgenpower = true;
      }

    });


    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);



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
      // // console.log(this.route.routeConfig.path, this.islead);


    } if (this.route.routeConfig.path == 'addContact/account/:aid') {
      this.isaccount = true;

    } if (this.route.routeConfig.path == 'addContact/opportunity/:oid') {
      this.isopportunity = true;

    }

  }



  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {
    console.log('add contact');
    this.loadData();
  }
  loadData(parmas = null) {
    // alert(1);
    ;
    this.script.load("map");

    setTimeout(() => {
      this.autotext();
    }, 1000);

    const id = null;//params.get('id');
    const eid = null;//params.get('eid');
    const aid = null;//params.get('aid'); 
    let oid = this.oppid
    this.solgenAccountId = null;//params.get('account');
    //this.issolgen = this.solgenpower;//params.get('issolgen');        

    this.internalleadId = this.leadId;
    this.accountid = this.accountId;
    this.opportunityid = oid;

    if (this.oppid > 0) {
      this.isopportunity = true;
      this.callFrom = "opportunity";
      this.callFromId = this.oppid;
    }
    if (this.internalleadId > 0) {
      this.islead = true;
      this.callFrom = "lead";
      this.callFromId = this.internalleadId;
      this.Id = "";
    }
    if (this.accountId > 0) {
      this.isaccount = true;
      this.callFrom = "account";

      this.callFromId = this.accountId;
    }
    if (this.contactId > 0) {
      this.loadSave = true;
      this.Id = this.contactId;
      this.pageTitle = 'Edit Contact';
      this.displayType = 'EDIT';
    }
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
      this.Id = "";

    }


    if (this.userType == "usertypebanker") {//|| this.userType =='usertypecompanyadmin'  remove by aakash and deepanshu
      this.isaccount = true;
      if (this.commonService.getQueryStringValue("account") != null)
        this.accountid = this.commonService.getQueryStringValue("account");

    }

    let aic = this.Id;
    if (aic == '') {
      this.Id = aic;
      //this.contactIdPrimaryKeyId;
      // aic = this.accountid;
    }
    this.commonService.GetCustomFieldsListContact(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType, this.callFrom, this.callFromId).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.commonService.customFieldsList.data;
        // console.log("desc", this.customCompnentValues);
        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }

            this.formControlList.push(obj);
          }
        })
        const group: any = {};
        this.customCompnentValues.forEach(cnt => {

          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          } else {
            val = (cnt.value == '' ? null : cnt.value);
          }

          if ((this.forAccount != true || this.forAccount == undefined) && cnt.ColumnName == 'ContactRoleId') {
            cnt.form_field_visibility = 'NO';
            cnt.edit_form_field_visibility = 'NO';
          }
          if (cnt.ColumnName == "AccountId") {
            cnt.is_readOnly = true;
          }
          if (cnt.ColumnName == "OwnerId") {
            cnt.is_readOnly = true;
          }
          if (this.Usertype == 'AccountTypeBanker' && cnt.ColumnName == 'ContactRoleId') {
            if (cnt.select_options)
              cnt.select_options = cnt.select_options.filter(x => x.first_value == 'usertypebanker')
          }
          if (this.accountid > 0 && cnt.dt_code == 'select' && cnt.field_code == 'ACCOUNT_NAME') {
            //
            cnt.is_readOnly = true;

            val = this.accountid.toString();
            // console.log("cnt", cnt);
            // console.log('accountId', this.accountid);
            cnt.value = val;
            // console.log('option_list', cnt.option_list);
          }

          if (this.oppid > 0 && cnt.dt_code == 'select' && cnt.field_code == 'ACCOUNT_NAME') {
            val = this.opprAccountId;
            cnt.value = val;

            //cnt.is_required = null;
          }

          if (this.ownerId != null && cnt.dt_code == 'select' && cnt.field_code == 'COMPANY_OWNER') {
            let fildata = this.ownerId.toLowerCase();
            val = fildata.toString();
            cnt.value = val;
            cnt.is_required = null;

            //val = this.opprAccountId;
          }
          if (this.internalleadId != null && cnt.dt_code == 'select' && cnt.field_code == 'ACCOUNT_NAME') {
            cnt.is_required = null;
            cnt.value = val;
            val = this.opprAccountId;
          }
          if (this.Id > 0 && cnt.field_code == 'EMAIL' && val != null) {
            cnt.is_readOnly = 1;
          }

          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });

        this.form = new FormGroup(group);
        setTimeout(() => {
          this.loadSave = false;
        }, 2000);
      }
    });



    // // console.log('path',this.route.routeConfig.path);
    if (this.route.routeConfig.path == 'addContact/:eid') {
      this.islead = true;
      // // console.log(this.route.routeConfig.path, this.islead);

    } if (this.route.routeConfig.path == 'addContact/account/:aid') {
      this.isaccount = true;

    }
    if (this.route.routeConfig.path == 'addContact/opportunity/:oid') {
      this.isopportunity = true;

    }
  }
  showPopUp(params: any, mode: string) {
    ;
    if (params) {
      this.accountId = params;
      this.delayLoading = true;
      this.loadData(params)

    } else {
      this.delayLoading = false;
    }
  }
  ngOnChanges(): void {

    this.Id = this.newItemEvent;
    // if(this.isAccount)
    // {
    //   this.callFrom= 'Accounts'
    // }

    if (this.contactId) {
      this.pageTitle = 'Edit Contact';
      this.displayType = 'EDIT';
      this.Id = this.contactId;
    }

    this.commonService.GetCustomFieldsListContact(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType, this.callFrom, this.callFromId).subscribe((result: any) => {
      if (result) {
        this.formControlList.splice(0);
        this.customCompnentValues = this.commonService.customFieldsList.data;
        // console.log("desc", this.customCompnentValues);
        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }

            this.formControlList.push(obj);
          }
        })
        const group: any = {};
        this.customCompnentValues.forEach(cnt => {

          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          } else {
            val = (cnt.value == '' ? null : cnt.value);
          }

          if (this.accountid > 0 && cnt.dt_code == 'select' && cnt.field_code == 'ACCOUNT_NAME') {
            val = this.accountid.toString();
            cnt.value = val;

          }

          if (this.oppid > 0 && cnt.dt_code == 'select' && cnt.field_code == 'ACCOUNT_NAME') {
            //
            val = this.opprAccountId == null ? null : this.opprAccountId.toString();
            cnt.value = val;
            cnt.is_required = null;
            cnt.is_readOnly = true;
            // console.log("OppIdValue", cnt.value);
            // console.log("cnt", cnt);
          }
          if (this.ownerId != null && cnt.dt_code == 'select' && cnt.field_code == 'COMPANY_OWNER') {
            //
            let data = this.ownerId.toLowerCase();
            val = data.toString();
            cnt.value = val;
            cnt.is_required = null;
            cnt.is_readOnly = true;
          }
          if (this.Id > 0 && cnt.field_code == 'EMAIL' && val != null) {
            cnt.is_readOnly = 1;
          }
          if (this.ownerId != null && cnt.dt_code == 'select' && cnt.field_code == 'COMPANY_OWNER') {
            // 
            val = this.ownerId.toLowerCase();
            val = val.toString();
            cnt.is_required = null;
            cnt.value = val;
          }
          if (this.forAccount != true && cnt.ColumnName == 'ContactRoleId') {
            cnt.form_field_visibility = 'NO';
            cnt.edit_form_field_visibility = 'NO';
          }
          if (this.Usertype == 'AccountTypeBanker' && cnt.ColumnName == 'ContactRoleId') {
            if (cnt.select_options)
              cnt.select_options = cnt.select_options.filter(x => x.first_value == 'usertypebanker')
          }

          if (this.internalleadId > 0 && cnt.dt_code == 'select' && cnt.field_code == 'ACCOUNT_NAME') {
            // 
            cnt.is_required = null;
            val = this.opprAccountId;
            cnt.value = val;
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });

        this.form = new FormGroup(group);
        this.loadSave = false;
      }
    });
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
  // OnCheck() {
  //   var email = this.form.get(this.formControlList[0].InnerData.filter(x => x.label == 'Email')[0].form_controlName).value
  //   this.commonService.isValueDuplicate(1,email).subscribe((response:any) =>
  //   {
  //     if (response.response)
  //     {
  //       this.isEmailDuplicated=response.response
  //       this.MapContact()
  //     }
  //     else  
  //     {
  //       this.onSubmit();
  //     }

  //   })
  // }
  // MapContact() {
  //   const message = `Contact Already  mappped with other Account, You still want to Continue ?`;
  //   this.dialogService.confirm('Map Account', message).subscribe((confirmed) => {
  //     if (confirmed) {
  //       var emial = this.form.get(this.formControlList[0].InnerData.filter(x => x.label == 'Email')[0].form_controlName).value
  //       var AccountId = this.form.get(this.formControlList[0].InnerData.filter(x => x.label == 'AccountId')[0].form_controlName).value
  //       
  //       this.commonService.contactAccountMapping(AccountId, emial).subscribe((response: any) => {
  //         if (response.responseMessage == 'Account Mapped') {
  //           this.toaster.success(response.responseMessage);
  //         }
  //         else
  //           this.toaster.error(response.responseMessage);

  //       });
  //     }

  //   });
  // }
  onSubmit() {
    this.loadSave = true;

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
    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.Id = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      let data = this.form.value;

      Object.keys(this.form.controls).forEach(e => {
        if (e.includes("EnableLogin")) {
          data.EnableLogin = data[e];
        } else if (e.includes("Email")) {
          data.Email = data[e];

        } else if (e.includes("FirstName")) {
          data.FirstName = data[e];

        } else if (e.includes("LastName")) {
          data.LastName = data[e];
        }

      });
      this.JsonData.FormJsonData = JSON.stringify(data);

      ;
      let checkEmail = this.form.controls['295_Email'].value;
      if (this.Id == null || this.Id == '') {
        this.commonService.CheckUserDuplicateORAssociate(checkEmail).subscribe((result: any) => {
          if (result.responseMessage == "duplicate") {


            this.loadSave = false;
            this.loadSave = false;
            if (this.isopportunity) {
              const message = `Contact is already exists with same email. Do you want to associate the existing contact?`;
              this.dialogService.confirm('Map Account', message).subscribe((confirmed) => {
                if (confirmed) {
                  var email = this.form.get(this.formControlList[0].InnerData.filter(x => x.label == 'Email')[0].form_controlName).value
                  var AccountId = this.form.get(this.formControlList[0].InnerData.filter(x => x.label == 'AccountId')[0].form_controlName).value

                  this.commonService.contactAccountMapping(AccountId, email, this.oppid).subscribe((response: any) => {
                    if (response.responseMessage == 'Account Mapped') {
                      this.toaster.success(response.responseMessage);
                      this.refreshOpportunityRelatedtab.emit();
                      this.loadSave = false;
                      this.close();
                    }
                    else if (response.responseMessage == 'Opportunity Associted') {
                      this.toaster.success(response.responseMessage);
                      this.refreshOpportunityRelatedtab.emit();
                      this.loadSave = false;
                      this.close();
                    }
                    else {
                      this.toaster.error(response.responseMessage);
                    }
                  });
                }
              });
            }
            else {
              this.dialogService.confirm('Add Contact', "Contact is already exists with same email. Do you want to associate the existing contact?").subscribe(confirmed => {
                if (confirmed) {
                  ;
                  this.commonService.addEditFormContact(this.JsonData, this.internalleadId, this.accountid, this.opportunityid).subscribe((result: any) => {
                    if (result.statusCode == 200) {
                      this.commonService.setUpdatedOpportunity = true;

                      setTimeout(() => {
                        this.toaster.success(result.responseMessage);
                        this.refreshOpportunityRelatedtab.emit();

                        this.loadSave = false;
                        this.close();
                        //  this.closePopup.emit(true);

                      }, 1000);
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
              return false
            }

          }
          else if (result.responseMessage == "associate") {
            this.loadSave = false;
            this.dialogService.confirm('Associate Contact', "Email already exists in other Company. Do you want to Associate it?").subscribe(confirmed => {
              if (confirmed) {
                ;
                this.commonService.addEditFormContact(this.JsonData, this.internalleadId, this.accountid, this.opportunityid).subscribe((result: any) => {
                  if (result.statusCode == 200) {
                    setTimeout(() => {
                      this.toaster.success(result.responseMessage);
                      this.refreshOpportunityRelatedtab.emit();
                      this.loadSave = false;
                      this.close();
                      //  this.closePopup.emit(true);

                    }, 1000);
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
            this.commonService.addEditFormContact(this.JsonData, this.internalleadId, this.accountid, this.opportunityid).subscribe((result: any) => {
              ;
              if (result.statusCode == 200) {
                this.mapLocation.hide();
                setTimeout(() => {
                  this.toaster.success(result.responseMessage);
                  this.refreshOpportunityRelatedtab.emit();
                  this.loadSave = false;
                  this.close();
                  ;
                  //  this.closePopup.emit(true);

                }, 1000);
              }
              else {
                this.toaster.error(result.responseMessage);
                this.loadSave = false;
                this.onAdd.emit()

              }
            }, error => {
              this.loadSave = false;
            });
          }

        });
      }
      else {
        this.commonService.addEditFormContact(this.JsonData, this.internalleadId, this.accountid, this.opportunityid).subscribe((result: any) => {

          if (result.statusCode == 200) {
            setTimeout(() => {
              this.toaster.success(result.responseMessage);
              this.loadSave = false;
              this.close();
              // this.closePopup.emit(true);
            }, 1000);
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

  displayInsuranceDetail(reposnse): void {
    const formGroup = {};
    for (let prop of Object.keys(this.customCompnentValues)) {
      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
    }
    this.form = new FormGroup(formGroup);
  }

  close() {

    if (this.callFrom == 'account') {
      this.ngOnChanges();
      this.closePopup.emit(true);
    }
    if (this.islead == true) {
      if (this.solgenpower == true) {
        this.form.reset();
        this.ngOnChanges();
        this.contactemit.emit(true);
        //this.router.navigate(['../lead/view', this.internalleadId]);
      }
      else {
        this.router.navigate(['../lead/viewlead', this.internalleadId]);
      }
    }
    else if (this.isaccount == true) {
      if (this.solgenpower == true) {
        //this.form.reset();
        this.ngOnChanges();
        this.contactemit.emit(true);
        //this.router.navigate(['../accountslist/view', this.accountid]);
      }
      else {
        this.router.navigate(['../accountslist/viewaccount', this.accountid]);
      }
    }
    else if (this.isopportunity == true) {
      if (this.solgenpower == true) {
        //this.form.reset();
        this.ngOnChanges();
        this.contactemit.emit(true);
        //this.router.navigate(['../opportunity/viewOpportunity', this.opportunityid]);
      }
      else {
        this.router.navigate(['../opportunity/view', this.opportunityid]);
      }
    }

    else {
      this.router.navigateByUrl("/contactlist");
    }

  }

  fillLeadForm(id) {

    this.commonService.GetSolgenContactDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe((result: any) => {
      let edit: any
      edit = this.commonService.editPage.data[0];
      //let empty = null;
      const formGroup = {};
      if (result) {
        Object.keys(edit).forEach(t => {
          let cntname = t;
          let cntValue = edit[t] == '' ? null : edit[t];

          // // console.log("cntname", cntname)
          if (cntValue !== null && cntValue.indexOf("[") !== -1 && cntValue.indexOf("]") !== -1) {

            cntValue = JSON.parse(cntValue);
          }
          if (cntValue !== null && (cntValue == 'true' || cntValue == 'false')) {

            cntValue = (cntValue == 'true');
            // // console.log("cntValuecntValue", cntValue);
          }

          this.checkboxdata1.forEach((item) => { if (cntname == item.controlname) { item.controlvalues = cntValue; } });//for checkboxes on form
          formGroup[cntname] = new FormControl(cntValue);
        })

        // this.form.value.reset();
        this.form = new FormGroup(formGroup);


        //for checkboxes on form
        try {
          this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
            this.form.get(item.controlname).setValue(item.controlvalues.split(','));
          });
          //this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });

        }
        catch (err) { }
        /////
        // // console.log("formGroup", this.form.value);
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
  showgroup(data: any) {
    var _flag = false;
    //  let newjson = JSON.parse(data);
    data.forEach(function (t) {
      if (t.form_field_visibility === 'YES' || t.edit_form_field_visibility === 'YES') {
        _flag = true;
      }
      else _flag = false;
    });

    return _flag;
  }

  onCheckboxChange(e, groupdisp, controldisp) {
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
    // // console.log('sss', e);
    var dd = this.formControlList;

  }




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
      // console.log('scrollDataList:', this.scrollDataList);
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
      // console.log('scrollDataList:', this.scrollDataList);
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
      // console.log('place', place)


      if (place.address_components) {
        // console.log('address_components', place.address_components)
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
                //// console.log('s', s);   
                if (s == 'country') {
                  //// console.log('s', s);
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
              // console.log('street', street)
              // console.log('route', route)
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
}
