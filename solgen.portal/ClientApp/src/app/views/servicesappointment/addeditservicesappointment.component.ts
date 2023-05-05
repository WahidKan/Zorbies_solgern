import { Component, OnInit, ViewChild } from '@angular/core';
//import { AccountserviceService, JsonData, CheckboxData } from './accountservice.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ServicesappointmentService, CheckboxData, ServiceAppointmentJsonData } from './servicesappointment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';
import { Location } from '@angular/common';
import { location } from 'ngx-bootstrap/utils/facade/browser';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DateTimeToLocalForAddEditPipe } from '../../pipes/datetime.pipe';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import moment from 'moment-timezone';
import { debug } from 'console';

declare var google: any;

@Component({
  selector: 'app-addeditservicesappointment',
  templateUrl: './addeditservicesappointment.component.html',
  styleUrls: ['./addeditservicesappointment.component.scss'],
  providers: [ServicesappointmentService]
})
export class AddeditservicesappointmentComponent implements OnInit {
  @ViewChild('mapLocation', { static: false }) mapLocation: ModalDirective;
  loadSave = false;
  moduleName = 'serviceappointment';
  submoduleName = 'serviceappointment';
  companyId: any;
  id: any = '';
  displayType = 'ADD';
  customCompnentValues: any;
  formControlList: any[] = []; 
  addOrUpdatePermission: boolean;
  isUpdate: boolean = false;
  pageTitle: any;
  isAdd: boolean = false;
  form: FormGroup;
  modulePermission: any[] = [];
  userName: any;
  userId: any;
  scrollDataList: any;
  custom_field_id: any;
  len: any = 10;
  field_code: any;
  searchText: string;

  options: any;
  overlays: any[];
  address: any;
  geocoder: any;
  lat: any;
  lng: any;
  maxDate: Date;
  minDate: Date;
  JsonData: ServiceAppointmentJsonData = new ServiceAppointmentJsonData();
  timeFormat: string;
  cannotCompletedcCode: number;
  prevStatusCode: number;
  contentHeader: object;

  constructor(private servicesappointmentService: ServicesappointmentService, private route: ActivatedRoute, private router: Router,
    private toaster: ToastrService, private commonService: CommonService, private location: Location) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
    });

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICEAPPOINTMENTADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICEAPPOINTMENTUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    this.timeFormat = this.commonService.getTimeFormat();
  }

  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {
     this.loadSave = true;
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.loadSave = true;
          this.id = id;
          //this.fillForm(this.id);
          this.addOrUpdatePermission = this.isUpdate;
          this.pageTitle = 'Edit Appointment';
          this.displayType = 'EDIT';
        }
        else {
          this.pageTitle = 'Add Appointment';
          this.displayType = 'ADD'
          this.addOrUpdatePermission = this.isAdd;
          //this.addOrUpdatePermission = this.isAdd;
        }
      }
    );


    setTimeout(() => {
      this.options = {
        center: { lat: 47.751076, lng: -120.740135 },
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.overlays = [];
      this.autotext();
    }, 1000);

    // this.options = {
    //   center: { lat: 47.751076, lng: -120.740135 },
    //   zoom: 3,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };

    this.overlays = [];
    
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.id, this.displayType).subscribe((result: any) => {
     debugger
     
      if (result) {
        this.customCompnentValues = result.data;
        
        let fieldArray = [];
        let val = null;
        this.customCompnentValues.forEach(t => {

          if (this.displayType.toLowerCase() == 'ADD'.toLowerCase() && t.name.toLowerCase() == 'OwnerId'.toLowerCase() && t.dt_code.toLowerCase() == 'select'.toLowerCase() && t.select_options != null) {
            t.select_options.forEach(itemList => {
              debugger;
              if (itemList.name == this.userName) {
                val = itemList.value;
                t.value=val;

                t.is_readOnly = true;
              }
            });
          }
          else if (this.displayType.toLowerCase() == 'EDIT'.toLowerCase() && t.name.toLowerCase() == 'OwnerId'.toLowerCase() && t.dt_code.toLowerCase() == 'select'.toLowerCase() && t.select_options != null) {
            t.select_options.forEach(itemList => {
              debugger;
              if (itemList.name == this.userName) {
                val = itemList.value;
                t.value=val;
                t.is_readOnly = true;
              }
            });
          }

          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (t.dt_code == 'decimal') {
           t.value = t.value.substring(0,t.value.length-3)
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
        const convertdatetime = new DateTimeToLocalForAddEditPipe();
        //=====================Select cananotcompleted value================================

        let AllData= this.customCompnentValues.filter(x => x.ColumnName == 'Status');
        if (AllData.length>0) {
          this.prevStatusCode = AllData[0].value;

          let selectedData: any[] = [];
          selectedData = AllData[0].select_options

          var ab = selectedData.filter(x => x.name == 'CannotComplete');
          if(ab.length != 0 ){
            this.cannotCompletedcCode = ab[0].value;
          }
        }
        //==================================================================================
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
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form

          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => { 
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }
          
          if (this.displayType == "EDIT" && cnt.dt_code == 'select' && cnt.name == 'AccountId') {
             cnt.is_readOnly = true;
          }
          if(this.displayType == "ADD" && cnt.dt_code == 'select' && cnt.name == 'ParentRecord'){
            cnt.is_readOnly = false;
          }
          if (this.displayType == "EDIT" && cnt.dt_code == 'select' && (cnt.name == 'OwnerId' || cnt.name == 'CreatedById' || cnt.name == 'LastModifiedById')) {
            cnt.select_options.forEach(itemList => {
              if (itemList.value.toUpperCase() == cnt.value.toUpperCase()) {
                val = itemList.value;
              }
            });
            cnt.is_readOnly = true;
          }


          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required === true ? Validators.required : Validators.nullValidator,
          cnt.dt_code === "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.dt_code === "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.dt_code === "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") : Validators.nullValidator
          ])

        });

        this.form = new FormGroup(group);
        
      }
      
      setTimeout(() => {
        this.options = {
          center: { lat: 47.751076, lng: -120.740135 },
          zoom: 3,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        this.overlays = [];
        this.autotext();
      }, 1000);
    }, err => {
      this.loadSave = false;
    });
    setTimeout(() => {
      this.loadSave = false;
    }, 1000);
    let today = new Date();
    this.minDate = today;
    this.maxDate = this.minDate;
 
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Service Appointments',
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
             name : 'Manage Service Appointments',
             isLink : true,
             link : '/serviceappointment'
           },
           {
             name: this.pageTitle,
             isLink: false
           }
  
         ]
     };
   }


  //onSelectdate(event) {
  //  this.commonService.transformPSTToUTC(event, true);
  //}

  onParentRecord(event){
    if(event){
      // console.log("onParentRecord",event);
    }
  }
  convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }

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
    if (this.form) {
      this.loadSave = true;
      this.JsonData.serviceAppointmentId = this.id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
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
      this.servicesappointmentService.addEditForm(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          // =======================check is prevstatuscode is cannotCompleted ==========================================
          if ((this.prevStatusCode != undefined  && this.cannotCompletedcCode != undefined) && (this.prevStatusCode != this.cannotCompletedcCode)) {
         //  ========Create New dublicate Service Appointment of status New (If status change to CannotCompleted)
            if (this.cannotCompletedcCode == result.optionalExtraParamers) {
              this.servicesappointmentService.createDublicateServiceAppt(this.id).subscribe((resultData: any) => {
                if (result.statusCode == 200) {
                }
              });
            }
          }
          //==============================================================================================================


     
          //================================================================================================

          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.location.back();
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
      this.commonService.validateAllFormFields(this.form);
      this.loadSave = false;

    }
  }

  close() {
    this.location.back();
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
      (dataList[j].select_options as any[]) = this.scrollDataList;
    })
  }

  onClearLang(dataList: any, j: number): void {
    debugger
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
  };

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


    });

  }

 //---------------For Start Date And End Date Validation
  startDateTime: any;
  endDateTime: any;

  onDateTimeChange(e: any, obj: any) {
    let _objStartDate, _objEndDate, _startDate, _endDate, _startDateValue, _endDateValue;
    //-------set objects according to start datetime and end datetime
    _objStartDate = (obj.dependent_type == "START") ? obj : [...this.customCompnentValues].filter(x => x.custom_field_id === obj.dependent_on)[0];
    _objEndDate = (obj.dependent_type == "END") ? obj : [...this.customCompnentValues].filter(x => x.custom_field_id === obj.dependent_on)[0];

    //------parse value of both fields from form
    this.startDateTime = _objStartDate.form_controlName;
    this.endDateTime = _objEndDate.form_controlName;
    
    //-----get value of both start and end date field
    _startDateValue = this.StartDate.value as Date;
    _endDateValue = this.EndDate.value as Date;

    if (_endDateValue) {
      if (_startDateValue > _endDateValue) {
        this.clearDateValidations();

        let errorMessage = _objEndDate.display_name + " must be greater than " + _objStartDate.display_name;
        let errorMessageSecond = _objStartDate.display_name + " must be lesser than " + _objEndDate.display_name;
        this.StartDate.setErrors({ 'DateValidation': errorMessageSecond});
        this.EndDate.setErrors({ 'DateValidation': errorMessage });

      }
      else{
        this.clearDateValidations();
      }
    }
    else {
      this.clearDateValidations();
    }
  }

  get StartDate() { return this.form.get(this.startDateTime); }
  get EndDate() { return this.form.get(this.endDateTime); }

  clearDateValidations() {
    this.StartDate.setErrors(null);
    this.EndDate.setErrors(null);

    this.StartDate.clearValidators();
    this.StartDate.updateValueAndValidity();

    this.EndDate.clearValidators();
    this.EndDate.updateValueAndValidity();
  }
  onCustomChange(e, listData){
    debugger
    if(e && listData.ColumnName == "workorder"){
          this.servicesappointmentService.GetServiceAppointmentDetailById(e.value.toString()).subscribe((data:any)=> {
          let result = JSON.parse(data);


          this.customCompnentValues.forEach(cnt => {
            console.log(cnt);
            if (cnt.ColumnName == "AccountId") {
              if (result.AccountId) {
                if (cnt.select_options && !cnt.select_options.find(x => x.value == result.AccountId)) {
                  (cnt.select_options as any[]) = (cnt.select_options as any[])
                    .concat([{ name: result.ProposalName, value: result.ProposalId.toString() }]);
                }
                cnt.value = result.AccountId;
                this.form.get(cnt.form_controlName).setValue(result.AccountId.toString());
              }
              else {
                cnt.value = null;
                this.form.get(cnt.form_controlName).setValue(null);
              }
            }
            else if (cnt.ColumnName == "Contact") {
              if (result.ContactId) {
                if (cnt.select_options && !cnt.select_options.find(x => x.value == result.ContactId)) {
                  (cnt.select_options as any[]) = (cnt.select_options as any[])
                    .concat([{ name: result.ContactName, value: result.ContactId }])
                }
                cnt.value = result.ContactId;
                this.form.get(cnt.form_controlName).setValue(result.ContactId.toString());

              }
              else {
                cnt.value = null;
                this.form.get(cnt.form_controlName).setValue(null);
              }
            }
            else if (cnt.ColumnName == "Street") {
              if (result.ShippingStreet) {

                cnt.value = result.ShippingStreet;
                this.form.get(cnt.form_controlName).setValue(result.ShippingStreet.toString());
              }
              else {
                cnt.value = null;
                this.form.get(cnt.form_controlName).setValue(null);
              }
            }
            else if (cnt.ColumnName == "Country") {
              if (result.ShippingCountry) {

                cnt.value = result.ShippingCountry;
                this.form.get(cnt.form_controlName).setValue(result.ShippingCountry.toString());
              }
              else {
                cnt.value = null;
                this.form.get(cnt.form_controlName).setValue(null);
              }
            }
            else if (cnt.ColumnName == "State") {
              if (result.ShippingState) {

                cnt.value = result.ShippingState;
                this.form.get(cnt.form_controlName).setValue(result.ShippingState.toString());
              }
              else {
                cnt.value = null;
                this.form.get(cnt.form_controlName).setValue(null);
              }
            }
            else if (cnt.ColumnName == "City") {
              if (result.ShippingCity) {

                cnt.value = result.ShippingCity;
                this.form.get(cnt.form_controlName).setValue(result.ShippingCity.toString());
              }
              else {
                cnt.value = null;
                this.form.get(cnt.form_controlName).setValue(null);
              }
            }
            else if (cnt.ColumnName == "PostalCode") {
              if (result.ShippingZipCode) {

                cnt.value = result.ShippingZipCode;
                this.form.get(cnt.form_controlName).setValue(result.ShippingZipCode.toString());
              }
              else {
                cnt.value = null;
                this.form.get(cnt.form_controlName).setValue(null);
              }
            }
            else if (cnt.ColumnName == "WorkType") {
              if (result.WorkTypeId) {

                cnt.value = result.WorkTypeId;
                this.form.get(cnt.form_controlName).setValue(result.WorkTypeId.toString());
              }
              else {
                cnt.value = null;
                this.form.get(cnt.form_controlName).setValue(null);
              }
            }
            else if (cnt.ColumnName == "Subject") {
              if (result.Subject) {

                cnt.value = result.Subject;
                this.form.get(cnt.form_controlName).setValue(result.Subject.toString());
              }
              else {
                cnt.value = null;
                this.form.get(cnt.form_controlName).setValue(null);
              }
            }
            else if (cnt.ColumnName == "Duration") {
              if (result.Duration) {

                cnt.value = result.Duration;
                this.form.get(cnt.form_controlName).setValue(result.Duration.toString());
              }
              else {
                cnt.value = null;
                this.form.get(cnt.form_controlName).setValue(null);
              }
            }
            else if (cnt.ColumnName == "Service_Territory") {
              if (result.Service_Territory) {

                cnt.value = result.Service_Territory;
                this.form.get(cnt.form_controlName).setValue(result.Service_Territory.toString());
              }
              else {
                cnt.value = null;
                this.form.get(cnt.form_controlName).setValue(null);
              }
            }
            else if (cnt.ColumnName == "Work_Order_Status") {
              if (result.status) {

                cnt.value = result.status;
                this.form.get(cnt.form_controlName).setValue(result.status.toString());
              }
              else {
                cnt.value = null;
                this.form.get(cnt.form_controlName).setValue(null);
              }
            }


          }
          )
    })

    }

    else {
      if (listData.ColumnName == "workorder") {
        this.customCompnentValues.forEach(cnt => {
          if (cnt.ColumnName == "AccountId" || cnt.ColumnName == "Contact" ||
            cnt.ColumnName == "Street" || cnt.ColumnName == "Country" || cnt.ColumnName == "State"
            || cnt.ColumnName == "City" || cnt.ColumnName == "PostalCode" || cnt.ColumnName == "WorkType" ||
            cnt.ColumnName == "Subject" || cnt.ColumnName == "Duration" || cnt.ColumnName == "Service_Territory") {
            cnt.value = null;
            this.form.get(cnt.form_controlName).setValue(null);
          }
        });
      }
  }
}
}
