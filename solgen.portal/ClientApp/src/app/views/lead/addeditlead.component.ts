import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { LeadService, LeadJsonData, CheckboxData } from './lead.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';
import { LeadconvertpopupComponent } from './leadconvertpopup.component';
import { ScriptService } from '../shared/scriptservice.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { DateTimeToLocalForAddEditPipe } from '../../pipes/datetime.pipe';

declare var google: any;

@Component({
  selector: 'app-addeditlead',
  templateUrl: './addeditlead.component.html',
  providers: [LeadService]
})

export class LeadAddEditComponent implements OnInit {
  @ViewChild('mapLocation', { static: false }) mapLocation: ModalDirective;
  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;
  moduleName = 'crm';
  submoduleName = 'lead';
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  sDtaa: any;
  loadSave = false;
  leadId: any = '';
  isLead = false;
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  JsonData: LeadJsonData = new LeadJsonData();
  userId: any;
  addOrUpdatePermission: boolean = false;
  //modulePermission: ModuleList;
  modulePermission: any[] = [];
  displayType = 'ADD';
  isUpdate: boolean = false;
  isAdd: boolean = false;
  loading = false;
  scrollDataList: any;
  custom_field_id: any;
  len: any = 10;
  field_code: any;
  searchText: string;
  permission: string = 'NO';
  options: any;
  overlays: any[];
  address: any;
  geocoder: any;
  lat: any;
  lng: any;
  userName: any;
  solgenpower: boolean = false;
  companyType: any;
  campaign_id: any;
  timeFormat: string = '12';
  contentHeader: object;
  @ViewChild('leadconvert', { static: false }) leadconvert: LeadconvertpopupComponent;
  constructor(private fb: FormBuilder, private leadService: LeadService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService, private location: Location, private dynamicScripts: ScriptService, private dialogService: ConfirmationDialogService) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.companyType = userdetail.companyType;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
    });
    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    if (add == undefined) {
      this.addOrUpdatePermission = false;
    } else {
      this.addOrUpdatePermission = true;
    }

    this.dynamicScripts.load('map');

  }

  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {
    this.timeFormat = this.commonService.getTimeFormat();
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.loadSave = true;
        if (id) {
          this.leadId = id;
          this.isLead = true;
          this.pageTitle = 'Edit Lead';
          this.displayType = 'EDIT';
          if (this.companyType == "companytypeSolarInstall") {
            this.solgenpower = true;
          }
          //  this.fillLeadForm(this.leadId);
        } else {
          this.displayType = 'ADD'
          this.pageTitle = 'Add Lead';
          this.solgenpower = false;
        }
      });
    this.route.queryParams.subscribe(
      params => {
        this.campaign_id = params['campaign_id'];
        //  this.campaign_id.setValue(this.campaign_id);
      }
    )

    this.leadService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.leadId, this.displayType).subscribe((result: any) => {
      if (result) {
        ;
        this.customCompnentValues = this.leadService.customFieldsList.data;
        debugger;
        //// console.log("this.customCompnentValues", this.customCompnentValues);
        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          //debugger
          if (t.dt_code == 'radio') {
            t.listoptions = JSON.parse(t.listoptions);
          }
          if (t.dt_code == 'checkbox') {
            t.listoptions = JSON.parse(t.listoptions);
            let checkdata = new CheckboxData();
            checkdata.controlname = t.form_controlName;
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
        data_type_name: Text;
        const convertdatetime = new DateTimeToLocalForAddEditPipe();

        this.customCompnentValues.forEach(cnt => {
      
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else if (cnt.dt_code == 'datetime') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, null)); // to convert to local time
          }
          else if (cnt.dt_code == 'date') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, 'Date')); // to convert to local time
          }
          else if (cnt.name == 'State') {
            cnt.select_options = []; // to convert to local time
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
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

          if (cnt.dt_code == 'select' && cnt.select_options != null && (cnt.name == 'CreatedById' || cnt.name == 'LastModifiedById')) {
            if (cnt.value != '') {
              cnt.value = cnt.value.toLowerCase();
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  val = itemList.name;
                  cnt.dt_code = 'text';
                  cnt.is_readOnly = true;
                }
              });
            } else {
              cnt.value = cnt.value.toLowerCase();
              cnt.dt_code = 'text';
              cnt.is_readOnly = true;
            }
          }
          debugger
          if (cnt.dt_code == 'select' && cnt.select_options != null && (cnt.name == 'StatusName')) {
            cnt.select_options = this.removeConverted(cnt.select_options, 'Converted');
            cnt.select_options.forEach(itemList => {
              //if (itemList.name == this.userName) {
                val = itemList.value;
                //cnt.is_readOnly = true;
             // }
            });
          }
          if (this.displayType == 'ADD' && cnt.name == 'OwnerName' && cnt.dt_code == 'select' && cnt.select_options != null) {
            cnt.select_options.forEach(itemList => {
              if (itemList.name == this.userName) {
                val = itemList.value;
                //cnt.is_readOnly = true;
              }
            });
          }


          if (this.displayType == 'ADD' && cnt.name == 'Campaign_ID') {
            if (this.campaign_id)
              val = this.campaign_id;

          }

          if (this.displayType == 'ADD' && cnt.name == 'Campaign_Name') {
            if (this.campaign_id) {
              val = this.campaign_id;

              setTimeout(() => {
                this.GetTypeOntheBaseofRecordType({ value: val }, cnt.select_options, 'page', cnt.form_controlName);

              }, 1000);
            }

          }
          if (this.displayType == 'ADD' && cnt.name == 'StatusName' && cnt.dt_code == 'select' && cnt.select_options != null) {
            cnt.select_options.forEach(itemList => {
              if (itemList.name == 'New') {
                val = itemList.value;
              }
            });
          }


          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,10}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
          if (cnt.name == "Adset_Name") {
            var campaignid = this.customCompnentValues.find(x => x.name == "Campaign_Name").value
            this.leadService.getType('', 0, campaignid, 'campaign').subscribe((result: any) => {
              if (result) {

                cnt.select_options = result.data;
              }

            });
          }
          if (cnt.name == "Ad_Name") {
            //;
            var campaignid = this.customCompnentValues.find(x => x.name == "Adset_Name").value
            this.leadService.getType('', 0, campaignid, 'adset').subscribe((result: any) => {
              if (result) {

                cnt.select_options = result.data;
              }

            });
          }

        });
        this.form = new FormGroup(group);
        this.loadSave = false;

      }
      this.productInfo(1)
    });
    setTimeout(() => {
      this.options = {
        center: { lat: 47.751076, lng: -120.740135 },
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };


      this.overlays = [];
      this.autotext();
    }, 1000);
    this.initBreadCrumb();
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Leads',
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
            name: 'Manage Leads',
            isLink: true,
            link: '/lead'
          },
          {
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
  }

  // GetTypeOntheBaseofRecordType(e: any, dataList: any, type: any, form_controlName: any) {
  //   //;
  //   if (e) {
  //     if (form_controlName.includes("Campaign_Name")) {

  //       if (type == "page") {

  //         for (var i = 0; i < this.customCompnentValues.length; i++) {
  //           if (this.customCompnentValues[i].name.includes("Campaign_ID")) {
  //             this.form.get(this.customCompnentValues[i].form_controlName).setValue(e.value);
  //           }
  //           if (this.customCompnentValues[i].name.includes("Campaign_Name")) {
  //             //;

  //             this.leadService.getType('', 0, e.value, 'campaign').subscribe((result: any) => {

  //               if (result) {
  //                 this.customCompnentValues.forEach(cnt => {
  //                   if (cnt.name == "Adset_Name") {
  //                     //;
  //                     cnt.select_options = result.data;
  //                   }
  //                 });
  //               }
  //             });

  //           }
  //         }
  //       }

  //       if (type == "edit") {

  //         this.leadService.getType('', 0, e, 'campaign').subscribe((result: any) => {
  //           if (result) {
  //             //;
  //             dataList.forEach(cnt => {
  //               if (cnt.name == "Adset_Name") {
  //                 // cnt.select_options = null;
  //                 cnt.select_options = result.data;
  //               }
  //             });
  //           }
  //         });
  //       }
  //     }
  //     else if (form_controlName.includes("Adset_Name")) {
  //       if (type == "page") {
  //         //;
  //         for (var i = 0; i < this.customCompnentValues.length; i++) {
  //           if (this.customCompnentValues[i].name.includes("Adset_ID")) {
  //             this.form.get(this.customCompnentValues[i].form_controlName).setValue(e.id);
  //           }
  //           if (this.customCompnentValues[i].name.includes("Adset_Name")) {
  //             //;
  //             this.leadService.getType('', 0, e.id, 'adset').subscribe((result: any) => {
  //               if (result) {
  //                 // this.customCompnentValues[i].select_options = result[0].value; //
  //                 //this.form.get(this.RecordTypeControlName).setValue(result.data);  

  //                 this.customCompnentValues.forEach(cnt => {

  //                   if (cnt.name == "Ad_Name") {
  //                     //   this.form.get(cnt.form_controlName).setValue(null)
  //                     // cnt.select_options = null;
  //                     //;
  //                     cnt.select_options = result.data;
  //                   }
  //                 });
  //               }
  //             });

  //           }
  //         }
  //       }

  //       if (type == "edit") {
  //         this.leadService.getType('', 0, e, 'adset').subscribe((result: any) => {
  //           if (result) {
  //             //;
  //             dataList.forEach(cnt => {
  //               if (cnt.name == "Adset_Name") {
  //                 // cnt.select_options = null;
  //                 cnt.select_options = result.data;
  //               }
  //             });
  //           }
  //         });
  //       }
  //     }
  //     else if (form_controlName.includes("Ad_Name")) {
  //       if (type == "page") {
  //         //;
  //         for (var i = 0; i < this.customCompnentValues.length; i++) {
  //           if (this.customCompnentValues[i].name.includes("Ad_Id")) {
  //             this.form.get(this.customCompnentValues[i].form_controlName).setValue(e.id);
  //           }
  //         }
  //       }

  //     }
  //   }
  // }
  GetTypeOntheBaseofRecordType(e: any, dataList: any, type: any, form_controlName: any) {
    if (e) {
      debugger;
      if (form_controlName.includes("Campaign_Name")) {
        debugger;
        if (type == "page") {

          for (var i = 0; i < this.customCompnentValues.length; i++) {
            if (this.customCompnentValues[i].name.includes("Campaign_ID")) {
              this.form.get(this.customCompnentValues[i].form_controlName).setValue(e.value);
            }
            if (this.customCompnentValues[i].name.includes("Campaign_Name")) {
              //;

              this.leadService.getType('', 0, e.value, 'campaign').subscribe((result: any) => {

                if (result) {
                  //this.form.get(result.form_controlName).setValue(null)
                  // this.customCompnentValues[i].select_options = result[0].value; //
                  //this.form.get(this.RecordTypeControlName).setValue(result.data);  

                  this.customCompnentValues.forEach(ct => {
                    // this.form.get(cnt.form_controlName).setValue(null)
                    //cnt.select_options = null;
                    if (ct.name == "Adset_Name" || ct.name == "Adset_ID") {

                      this.form.get(ct.form_controlName).setValue(null)
                      ct.select_options = null;

                      //;
                      ct.select_options = result.data;

                    }


                    this.customCompnentValues.forEach(cnt => {
                      //;
                      if (cnt.name == "Ad_Name" || cnt.name == "Ad_Id") {
                        this.form.get(cnt.form_controlName).setValue(null)
                        cnt.select_options = null;
                        //;
                        // cnt.select_options = result.data;
                      }
                    });

                  });
                }
              });

            }
          }
        }

        if (type == "edit") {

          this.leadService.getType('', 0, e, 'campaign').subscribe((result: any) => {
            if (result) {
              //;
              dataList.forEach(cnt => {
                if (cnt.name == "Adset_Name" || cnt.name == "Adset_ID") {
                  this.form.get(cnt.form_controlName).setValue(null)
                  cnt.select_options = null;
                  // cnt.select_options = null;
                  cnt.select_options = result.data;
                }
                if (cnt.select_options == null) {
                  this.customCompnentValues.forEach(cnt => {
                    //;
                    if (cnt.name == "Ad_Name" || cnt.name == "Ad_Id") {
                      this.form.get(cnt.form_controlName).setValue(null)
                      cnt.select_options = null;
                      //;
                      cnt.select_options = result.data;
                    }
                  });
                }
              });
            }
          });
        }
      }
      else if (form_controlName.includes("Adset_Name")) {
        if (type == "page") {
          //;
          for (var i = 0; i < this.customCompnentValues.length; i++) {
            if (this.customCompnentValues[i].name.includes("Adset_ID")) {
              this.form.get(this.customCompnentValues[i].form_controlName).setValue(e.value);
            }
            if (this.customCompnentValues[i].name.includes("Adset_Name")) {
              //;
              this.leadService.getType('', 0, e.value, 'adset').subscribe((result: any) => {
                if (result) {
                  // this.customCompnentValues[i].select_options = result[0].value; //
                  //this.form.get(this.RecordTypeControlName).setValue(result.data);  

                  this.customCompnentValues.forEach(cnt => {

                    if (cnt.name == "Ad_Name" || cnt.name == "Ad_Id") {
                      this.form.get(cnt.form_controlName).setValue(null)
                      cnt.select_options = null;
                      //;
                      cnt.select_options = result.data;
                    }
                  });
                }
              });

            }
          }
        }

        if (type == "edit") {
          this.leadService.getType('', 0, e, 'adset').subscribe((result: any) => {
            if (result) {
              //;
              dataList.forEach(cnt => {
                if (cnt.name == "Adset_Name" || cnt.name == "Adset_ID") {
                  this.form.get(cnt.form_controlName).setValue(null)
                  cnt.select_options = null;
                  // cnt.select_options = null;
                  cnt.select_options = result.data;
                }
              });
            }
          });
        }
      }
      else if (form_controlName.includes("Ad_Name")) {
        if (type == "page") {
          //;
          for (var i = 0; i < this.customCompnentValues.length; i++) {

            if (this.customCompnentValues[i].name.includes("Ad_Id")) {
              this.form.get(this.customCompnentValues[i].form_controlName).setValue(e.value);
            }
          }
        }
      }
      else if (form_controlName = 'Product') {
        this.productInfo(e.value);
      }
    }
    else {
      if (form_controlName = 'Product') {
        ;
        for (var i = 0; i < this.customCompnentValues.length; i++) {

          if (this.customCompnentValues[i].name.includes("ProductFamily")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue("");
          }
          else if (this.customCompnentValues[i].name.includes("IsApplicableForLoan")) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue(0);
          }
        }
      }
    }
  }
  removeConverted(seloptions: any, name: string): void {
    return seloptions.filter(item => item.name != name);
  }
  mapPopUP() {
    this.mapLocation.show();
  }
  closemapsearch() {
    this.mapLocation.hide();
  }

  findLocation(address: any) {

    this.overlays = [];
    if (address != null || address != undefined) {
      this.address = address;
    }

    this.loadSave = true;
    this.lat = '';
    this.lng = '';
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': this.address
    }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0].geometry.location) {

          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
          this.overlays.push(new google.maps.Marker({ position: { lat: this.lat, lng: this.lng }, title: this.address, animation: google.maps.Animation.DROP }));
          this.address = '';
        }
        if (results[0].address_components) {

          this.customCompnentValues.forEach(t => {
            try {

              if (t.name == 'Street') {
                this.form.get(t.form_controlName).setValue(results[0].address_components[0].long_name + ' ' + results[0].address_components[1].long_name);
              } else if (t.name == 'City') {
                this.form.get(t.form_controlName).setValue(results[0].address_components[0].long_name + ' ' + results[0].address_components[3].long_name);
              } else if (t.name == 'PostalCode') {
                this.form.get(t.form_controlName).setValue(results[0].address_components[0].long_name + ' ' + results[0].address_components[7].long_name);
              }
            } catch { }
            if (t.dt_code == 'select' && t.select_options != null && t.name == 'State') {
              try {
                t.select_options.forEach(itemList => {
                  let statename = results[0].address_components[5].long_name;
                  if (itemList.name == statename) {
                    this.form.get(t.form_controlName).setValue(itemList.value);
                  }
                });
              } catch { }
            }
            if (t.dt_code == 'select' && t.select_options != null && t.name == 'Country') {
              try {
                t.select_options.forEach(itemList => {
                  let cntryname = results[0].address_components[6].long_name;
                  if (itemList.name == cntryname) {
                    this.form.get(t.form_controlName).setValue(itemList.value);
                  }
                });
              } catch { }
            }
            if (t.dt_code == 'select' && t.select_options != null && t.name == 'State') {
              debugger;
            }
            this.closemapsearch();
          });

        }

      } else {
        alert("Sorry, this search produced no results.");
      }
      this.loadSave = false;
    })
    this.loadSave = false;
  }

  mapClick(mapValue: any) {
    let link = (<HTMLAnchorElement>mapValue.value)
    //// console.log('link: ', link);
    //// console.log(mapValue.value.split('href').split('target'));
    //// console.log('link: ', (<HTMLLinkElement>mapValue.value).href);

    // window.open(link, "_blank");
  }


  checkvalue(formvalues, selval) {
    let returnValue = false;
    if (formvalues != null) {
      // // console.log("formvaluesformvaluesformvalues", formvalues);
      formvalues.split(',').find((item) => {
        if (item == selval) {
          // // console.log('abc');
          returnValue = true;

        }
      });
    }
    return returnValue;
  }

  test(e) {
    // // console.log('sssss', e);
    e.stopPropagation();
    e.preventDefault();
  }
  OnCheck() {
    // // console.log(this.form);
  }
  onSubmit() {
    //;
    // // console.log('new lead');
    this.loadSave = true;
    this.checkboxdata1.forEach((item) => {
      // // console.log(item.controlname);
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";// this.form.get(item.controlname).value;
        if (selvalues == "" || selvalues == null) {
          this.form.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.form.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });

    //// console.log(this.form);
    //// console.log(this.form.value);

    let email = Object.keys(this.form.value).find(key => key.includes('Email')).valueOf();

    if (this.form.valid) {
      this.loadSave = true;
      this.leadService.CheckEmailNotExistInOthersTypeAccount(this.form.value[email]).subscribe(m => {
        if (m == false) {
          this.JsonData.leadId = this.leadId;
          this.JsonData.moduleCode = this.moduleName;
          this.JsonData.subModuleCode = this.submoduleName;
          this.JsonData.companyId = this.companyId;
          this.JsonData.userId = this.userId;

          const _formData = this.form.value;
          for (let index in _formData) {
            let data = _formData[index];
            if (data) {
              if (Date.prototype.isPrototypeOf(data)) {
                _formData[index] = this.commonService.getUserSelectedZoneToUTC(data);
              }
            }
          }

          this.JsonData.FormJsonData = JSON.stringify(this.form.value);
          this.JsonData.permission = this.permission;

          this.leadService.addEditForm(this.JsonData).subscribe((result: any) => {
            //;
            if (result.statusCode == 200) {
              //;
              let primaryId = Number(result.optionalExtraParamers);
              let flowsList = this.leadService.customFieldsList.executionFlow.filter(x => x.FlowType == "AutolaunchedFlow");
              if (flowsList.length > 0) {
                flowsList.forEach((item) => {
                  window.open(`/automation-flow-execution/execution/${item.automationFlowId}/${primaryId}`, "_blank");
                });
              }
              //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
              //// // console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
              //this.toaster.success(result.responseMessage);
              setTimeout(() => {
                this.toaster.success(result.responseMessage);
                this.loadSave = false;
                //this.router.navigateByUrl("/lead");
                this.location.back();
              }, 1000);
            }
            else if (result.statusCode == 220) {
              this.loadSave = false;
              const message = result.responseMessage + ` Are you sure you want to add new lead on same address?`;
              this.dialogService.confirm_yes_no('Warning', message, 'Ok', 'Cancel', true, true).subscribe(confirmed => {
                if (confirmed) {
                  this.permission = "YES";
                  this.onSubmit();
                }
              });
            }
            else {
              this.toaster.error(result.responseMessage);
              this.loadSave = false;
            }
          }, error => {
            this.loadSave = false;
          });
        } else {
          this.toaster.error('Email already associated with other User Type. Please use different Email.');
          this.loadSave = false;
        }
      })

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
    //this.router.navigateByUrl("/lead");
    this.location.back();
  }



  fillLeadForm(id) {

    this.leadService.GetLeadsDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe((result: any) => {
      // // // console.log("result1212", this.leadService.leadEditPage.data[0]);
      let edit: any
      edit = this.leadService.leadEditPage.data[0];
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
          //this.checkboxdata1.forEach((item) => {// // console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });

        }
        catch (err) { }
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
    // // console.log('new', controldisp);
    //const index2: number = this.formControlList.indexOf(groupdisp);
    //const index1: number = controldisp.display_order;

    let checkboxdatanew = new CheckboxData();
    checkboxdatanew.controlname = controldisp.form_controlName;
    if (e.target.checked) {
      let strvalues = "";
      if (this.checkboxdata1.length > 0) {
        strvalues = this.checkboxdata1.find(item => item.controlname == controldisp.form_controlName).controlvalues;
      }
      if (strvalues == "") {
        checkboxdatanew.controlvalues = e.target.labels[0].innerHTML;
        this.checkboxdata1.push(checkboxdatanew);
      } else {
        let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.form_controlName);
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
    // // console.log('this.checkboxdata1this.checkboxdata1', this.checkboxdata1);
    var dd = this.formControlList;

  }

  onScrollToEnd(dataList: any, j: number) {
    if (dataList[j].name != 'State')
      this.fetchMore(dataList, j);
  }
  GetCountryState(event) {
    debugger;
    console.log(event);
    let code1 = event != null ? event.first_value : '';
    console.log(code1);
      this.commonService.getStatesList_V1(code1).subscribe((response: any) => {
        debugger;
        console.log(this.commonService.states);
        this.customCompnentValues.forEach(cnt => {
          if (cnt.name == 'State') {
            cnt.select_options = [];//this.commonService.states;
            this.commonService.states.forEach(item => {
              (cnt.select_options as any[]) = (cnt.select_options as any[]).concat([{ value: item.value, name: item.text }])
            });
          }
        })
      })
  }
  productInfo(selected: any) {
    var value;
    var selectedValue;

    if (!selected) {
      ;
      console.log('test')
    }
    for (var i = 0; i < this.customCompnentValues.length; i++) {
      if (this.customCompnentValues[i].name == "Product") {
        ;
        value = this.customCompnentValues[i].select_options;
        if (selected != 1) {
          selectedValue = selected;
        }
        else {
          selectedValue = this.customCompnentValues[i].value;
        }
      }
      else if (this.customCompnentValues[i].name == "ProductFamily") {
        if (value != null) {
          value.forEach(element => {
            if (selectedValue == element.value) {
              this.form.get(this.customCompnentValues[i].form_controlName).setValue(element.first_value);
            }
          });
        } else {
          this.form.get(this.customCompnentValues[i].form_controlName).setValue(null);
        }
      }
      else if (this.customCompnentValues[i].name == "IsApplicableForLoan") {
        if (value != null) {
          value.forEach(element => {
            if (selectedValue == element.value) {
              this.form.get(this.customCompnentValues[i].form_controlName).setValue(Number(element.second_value));
            }
          });
        }
        else {
          this.form.get(this.customCompnentValues[i].form_controlName).setValue(null);
        }
      }

    }
  }
  private fetchMore(dataList: any, j: number) {
    //
    //// console.log("e", dataList);

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
    ;
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
    //;
    this.len = 0
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;
    this.searchText = '';
    const cntrlName = dataList[j].name;
    if (cntrlName != "Adset_Name" && cntrlName != "Ad_Name") {
      this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
        this.scrollDataList = this.commonService.customFieldsListData;
        (dataList[j].select_options as any[]) = this.scrollDataList;
      })
    }
    dataList.forEach(cnt => {
      if (cntrlName == "Campaign_Name") {
        //;
        if (cnt.name == "Campaign_Name" || cnt.name == "Campaign_ID") {
          this.form.get(cnt.form_controlName).setValue(null)
          // cnt.select_options = null;
        }
        if (cnt.name == "Adset_Name" || cnt.name == "Adset_ID") {
          this.form.get(cnt.form_controlName).setValue(null)
          cnt.select_options = null;
        }
        if (cnt.name == "Ad_Name" || cnt.name == "Ad_Id") {
          this.form.get(cnt.form_controlName).setValue(null)
          cnt.select_options = null;

        }
      }

      if (cntrlName == "Country") {
        var data = dataList.find(x => x.ColumnName == "State");
        this.form.get(data.form_controlName).setValue(null)
        data.select_options = null;
      }
      if (cntrlName == "Adset_Name") {
        var data = dataList.find(x => x.ColumnName == "Campaign_Name");
        var campaignId = this.form.get(data.form_controlName).value
        this.leadService.getType('', 0, campaignId, 'campaign').subscribe((result: any) => {
          if (result) {
            //;
            dataList.forEach(cnt => {
              if (cnt.name == "Adset_Name" || cnt.name == "Adset_ID") {
                this.form.get(cnt.form_controlName).setValue(null)
                cnt.select_options = null;
                cnt.select_options = result.data;
              }
              this.customCompnentValues.forEach(cnt => {
                //;
                if (cnt.name == "Ad_Name" || cnt.name == "Ad_Id") {
                  this.form.get(cnt.form_controlName).setValue(null)
                  cnt.select_options = null;
                }
              });

            });
          }
        });
      }
      if (cntrlName == "Ad_Name") {
        var data = dataList.find(x => x.ColumnName == "Adset_Name");
        var adsetId = this.form.get(data.form_controlName).value
        this.leadService.getType('', 0, adsetId, 'adset').subscribe((result: any) => {
          if (result) {
            //;
            dataList.forEach(cnt => {

              this.customCompnentValues.forEach(cnt => {
                //;
                if (cnt.name == "Ad_Name" || cnt.name == "Ad_Id") {
                  this.form.get(cnt.form_controlName).setValue(null)
                  cnt.select_options = null;
                  //;
                  cnt.select_options = result.data;
                }
              });

            });
          }
        });
      }
    })
  }
  getreturnNumber(x, y) {
    return x + y;
  }
  numberOnly(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  checkForm(e: any) {

    console.log(e);
  }
  showpopup() {
    this.leadconvert.show(this.leadId);
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
                          debugger;
                          this.form.get(t.form_controlName).setValue(itemList.value);
                          this.GetCountryState(itemList);
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


    });

  }

}
