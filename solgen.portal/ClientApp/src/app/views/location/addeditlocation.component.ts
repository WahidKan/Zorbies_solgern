import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleList } from '../shared/common.service';
import { JsonData, LocationService, CheckboxData, CheckLocationName } from './locationlist.service';
import { ModalDirective } from 'ngx-bootstrap';
import { ScriptService } from '../shared/scriptservice.service';
import { DateTimeToLocalForAddEditPipe } from 'dynamiccustom-list';
import moment from 'moment';


declare var google: any;

@Component({
  selector: 'app-addeditlocation',
  templateUrl: './addeditlocation.component.html',
  // styleUrls: ['./addeditlocation.component.scss']
})

export class AddeditLocationComponent implements OnInit {
  @ViewChild('mapLocation', { static: false }) mapLocation: ModalDirective;
  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;
  moduleName = 'location';
  submoduleName = 'locations';
  group_name: any;
  group_display_name: any;
  location: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  sDtaa: any;
  serviceTerritoryPresent: boolean = null
  displayType: any;
  loadSave = false;
  searchText: string;
  len: any = 10;
  scrollDataList: any;
  custom_field_id: any;
  field_code: any;
  appmodel: CheckLocationName = new CheckLocationName();
  Id: any = '';
  isLead = false;
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  JsonData: JsonData = new JsonData();
  userId: any;
  addOrUpdatePermission: boolean;
  //modulePermission: ModuleList;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  geocoder: any;
  options: any;
  overlays: any[];
  contentHeader: object;


  colorCode: string = '';

  constructor(private fb: FormBuilder, private locationService: LocationService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService,
    private dynamicScripts: ScriptService,) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    // console.log('modulePermission', this.modulePermission);



    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOCATIONSADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOCATIONSUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }
    this.dynamicScripts.load('map');
    // // console.log('Permission', this.modulePermission)
  }

  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.loadSave = true;
          this.Id = id;
          this.isLead = true;
          this.displayType = "EDIT";
          this.pageTitle = 'Edit Location';
          this.addOrUpdatePermission = this.isUpdate;
        } else {
          this.loadSave = true;
          this.displayType = "ADD";
          this.pageTitle = 'Add Location';
          this.addOrUpdatePermission = this.isAdd;
        }
      }
    );

    this.locationService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.locationService.customFieldsList.data;

        // console.log("this.customCompnentValues", this.customCompnentValues);

        let fieldArray = [];
        const _datetime = new DateTimeToLocalForAddEditPipe;
        const convertdatetime = new DateTimeToLocalForAddEditPipe();
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
        });
        const group: any = {};
        data_type_name: Text
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          } else {
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
          if (cnt.ColumnName == 'Color') {
            this.colorCode = cnt.value;
          }
          if (cnt.ColumnName == 'IsActive') {
            cnt.value = Number(cnt.value);
          }
          else if (cnt.dt_code == 'datetime') {
            val = (cnt.value == '' ? null : moment(cnt.value).format('MM/DD/YYYY HH:MMA')); // to convert to local time
          }
          else if (cnt.dt_code == 'date') {
            val = (cnt.value == '' ? null : moment(cnt.value).format('MM/DD/YYYY HH:MMA')); // to convert to local time
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }



          // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])

        });

        this.form = new FormGroup(group);
        // // console.log("validationFROM", this.form);
        this.loadSave = false;
      }
    });
    ;
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
      headerTitle: 'Manage Location',
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
            name: 'Manage Location',
            isLink: true,
            link: '/location'
          },
          {
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
  }
  checkStatus() {
    debugger;

    for (let i = 0; i < this.customCompnentValues.length; i++) {
      if (this.customCompnentValues[i].ColumnName == 'IsActive' && this.displayType.toLowerCase() == 'EDIT'.toLowerCase() && this.form.value[this.customCompnentValues[i].form_controlName] == 0 && this.serviceTerritoryPresent == null) {
        this.locationService.CheckServiceTerritory(this.Id).subscribe((result: any) => {
          debugger;
          if (result.result == true) {
            this.form.get(this.customCompnentValues[i].form_controlName).setValue(true);
            this.toaster.error('Location can not be in-active as it is used in Service Territory');
            this.serviceTerritoryPresent = true;
          }
          else
            this.serviceTerritoryPresent = false;

        })
      }
      else if (this.customCompnentValues[i].ColumnName == 'IsActive' && this.displayType.toLowerCase() == 'EDIT'.toLowerCase() && this.form.value[this.customCompnentValues[i].form_controlName] == 0 && this.serviceTerritoryPresent == false) {
        this.form.get(this.customCompnentValues[i].form_controlName).setValue(true);
        this.toaster.error('Location can not be in-active as it is used in Service Territory')
      }
      else if (this.customCompnentValues[i].ColumnName == 'IsActive' && this.displayType.toLowerCase() == 'EDIT'.toLowerCase() && this.form.value[this.customCompnentValues[i].form_controlName] == 0 && this.serviceTerritoryPresent == true) {
        this.form.get(this.customCompnentValues[i].form_controlName).setValue(true);
        this.toaster.error('Location can not be in-active as it is used in Service Territory')
      }

    }
  }
  isReadOnly(param) {

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
    
    // // console.log("EditVal", this.form.value);
    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.Id = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;

      let locationControl;
      let address, lat, lng;
      for (var field in this.form.controls) {
        if (field.includes("_LocationName")) {
          locationControl = this.form.get(field);
        }
        if (field.includes("_VisitorAddress")) {
          address = field;
        }
        if (field.includes("_Lattitude")) {
          lat = field;
        }
        if (field.includes("_Longitude")) {
          lng = field;
        }
      }
      if (lat && lng) {
        this.form.get(address).setValue('{"lat":' + this.form.get(lat).value + ',"lng":' + this.form.get(lng).value + '}')
      }
      this.appmodel.LocationName = locationControl.value;
      this.appmodel.ID = this.Id ? this.Id : 0;
      this.JsonData.FormJsonData = JSON.stringify(this.form.value);
      this.locationService.GetLocationNameAlreadyExist(this.appmodel).subscribe((result: any) => {
        if (result.statusCode == 201) {
          this.toaster.error(result.responseMessage);
          this.loadSave = false;
        }
        else {
          this.locationService.addEditForm(this.JsonData).subscribe((result: any) => {
            if (result.statusCode == 200) {
              //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
              //// // console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
              //this.toaster.success(result.responseMessage);
              setTimeout(() => {
                this.toaster.success(result.responseMessage);
                this.loadSave = false;
                this.router.navigateByUrl("/location");
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

      });
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
    this.router.navigateByUrl("/location");
  }



  //      this.form = new FormGroup(formGroup);
  //      // // console.log("EdittttPageee", this.form);
  //      this.loadSave = false;

  //    }
  //  },
  //    (error: any) => {
  //      this.loadSave = false;
  //    })

  //}
  onScrollToEnd(dataList: any, j: number) {
    this.fetchMore(dataList, j);
  }

  private fetchMore(dataList: any, j: number) {
    // console.log("e", dataList);

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
  fillLeadForm(id) {
    this.addOrUpdatePermission = this.isUpdate;
    this.locationService.GetLocationDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe((result: any) => {
      // // // console.log("result1212", this.leadService.leadEditPage.data[0]);
      let edit: any
      edit = this.locationService.editPage.data[0];
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
        // // console.log("formGroup", this.form.value);
        this.loadSave = false;

      }
    },
      (error: any) => {
        this.loadSave = false;
      })

  }
  getTransformedDate(date) {
    const convertDateTime = new DateTimeToLocalForAddEditPipe;
    if (date) {
      // let DateTran =  convertDateTime.transform(date, null)
      let NewDate = moment(date).format('MM/DD/YYYY HH:MMA');
      return NewDate;
    }
    else {
      return;
    }
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
    // // console.log('new', e);
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
    // // console.log('sss', e);
    var dd = this.formControlList;

  }
  mapPopUP() {
    this.mapLocation.show();
  }
  closemapsearch() {
    this.mapLocation.hide();
  }

  autotext() {
    ;
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
      if (place.address_components) {
        this.customCompnentValues.forEach(t => {
          try {
            this.location = place.geometry.location;
            if (t.name == "Longitude") {
              this.form.get(t.form_controlName).setValue(place.geometry.location.lng());

            }
            if (t.name == "VisitorAddress") {
              this.form.get(t.form_controlName).setValue(place.geometry.location);

            }
            if (t.name == "Lattitude") {
              this.form.get(t.form_controlName).setValue(place.geometry.location.lat());

            }
            if ((t.dt_code == 'select' && t.select_options != null && t.name == 'Country') || (t.dt_code == 'select' && t.select_options != null && t.name == 'State')) {
              this.form.get(t.form_controlName).setValue(null);
            }
            if (t.name == 'PostalCode' || t.name == 'City' || t.name == 'StreetName') {

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
                if (s == 'postal_code') { //false
                  if (t.name == 'PostalCode') {

                    this.form.get(t.form_controlName).setValue(p.long_name);
                  }


                }
                if (s == 'street_name') {
                  if (t.name == 'StreetName') {
                    this.form.get(t.form_controlName).setValue(p.long_name);
                  }
                }
                if (s == 'locality') { //false
                  if (t.name == 'City') {

                    this.form.get(t.form_controlName).setValue(p.long_name);
                  }
                }
                if (s == 'street_number') { //false
                  street = p.long_name
                }
                if (s == 'route') { //false
                  route = p.long_name
                }
              })


            })
            if (t.name == 'StreetName') {
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
  SetColorFor(event: any) {
    this.colorCode = event.value;
  }

}
//export class AddeditLocationComponent implements OnInit {
//  config: any[] = [];
//  control: any;
//  group_id: any;
//  group_name: any;
//  group_display_name: any;
//  customCompnentValues: any;
//  form: FormGroup;
//  formGroup: FormGroup;
//  companyId: any;
//  grpId: any;
//  sDtaa: any;
//  moduleName = 'location';
//  submoduleName = 'locations';
//  loadSave = false;
//  departmentId: any;
//  selected: any;
//  productId: any;
//  drpSelectValues: any;
//  pageTitle = 'View Location';
//  moduleRefrenceName: any;
//  sp_name: string;
//  showChild = false;
//  isLead = false;

//  formControlList: any[] = [];
//  errors: string[] = [];
//  userId: any;
//  Id: any;
//  JsonData: JsonData = new JsonData();

//  constructor(private fb: FormBuilder, private locationService: LocationService, private router: Router,
//    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {
//  }

//  ngOnInit() {
//    this.locationService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
//      if (result) {
//        this.customCompnentValues = this.locationService.customFieldsList.data;
//        // // console.log("customCompnentValues", this.customCompnentValues);

//        let fieldArray = [];
//        this.customCompnentValues.forEach(t => {
//          // ;
//          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
//          if (groupCheck == null || groupCheck.length == 0) {
//            let obj = {
//              group_id: t.group_id,
//              group_name: t.group_name,
//              group_display_name: t.group_display_name,
//              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
//            }

//            this.formControlList.push(obj);
//            for (let config of this.formControlList) {

//            }
//          }
//        })
//        const group: any = {};
//        let val = null;
//        this.customCompnentValues.forEach(cnt => {
//          group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)

//        });
//        this.form = new FormGroup(group);
//        if (this.Id != null && this.Id != 0) {
//          // this.fillForm(this.productId);
//        }

//      }
//    });


//    this.route.paramMap.subscribe(
//      params => {
//        const id = params.get('id');
//        if (id) {
//          this.loadSave = true;

//          this.Id = id;
//          this.isLead = true;
//          this.pageTitle = 'Edit Location';
//          this.fillForm(this.Id);
//        } else {
//          this.pageTitle = 'Add Location';
//        }
//      }
//    );

//  }
//  onOptionsSelected(event, item) {
//  }
//  onSubmit() {
//    this.loadSave = true;
//    //if (this.form.valid) {
//      this.loadSave = true;
//      this.JsonData.Id = this.Id;
//      this.JsonData.moduleCode = this.moduleName;
//      this.JsonData.subModuleCode = this.submoduleName;
//      this.JsonData.companyId = this.companyId;
//      this.JsonData.userId = this.userId;
//      this.JsonData.FormJsonData = JSON.stringify(this.form.value);


//      this.locationService.addEditForm(this.JsonData).subscribe((result: any) => {

//        if (result.statusCode == 200) {
//          //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api

//          setTimeout(() => {
//            this.toaster.success(result.responseMessage);
//            this.loadSave = false;
//            this.router.navigateByUrl("/location");
//          }, 1000);
//        }
//        else {
//          this.toaster.error(result.responseMessage);
//          this.loadSave = false;
//        }
//      }, error => {
//        this.loadSave = false;
//      });
//    //}
//    //else {
//    //  this.commonService.validateAllFormFields(this.form);
//    //  this.loadSave = false;

//    //}

//  }

//  displayInsuranceDetail(reposnse): void {
//    const formGroup = {};
//    for (let prop of Object.keys(this.customCompnentValues)) {
//      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
//    }
//    this.form = new FormGroup(formGroup);
//  }

//  close() {
//    this.router.navigateByUrl("/location");
//  }

//  fillForm(id) {

//    this.locationService.GetLocationDetails(id, this.moduleName, this.submoduleName).subscribe((result: any) => {

//      let edit: any
//      edit = this.locationService.editPage.data[0];

//      //let empty = null;
//      const formGroup = {};
//      if (result) {
//        Object.keys(edit).forEach(t => {
//          let cntname = t;
//          let cntValue = edit[t] == '' ? null : edit[t];
//          formGroup[cntname] = new FormControl(cntValue);
//        })

//        this.form = new FormGroup(formGroup);
//        this.loadSave = false;

//      }
//    },
//      (error: any) => {
//        this.loadSave = false;
//      })

//  }
//  MakeArray(value, type) {

//    var array = [];
//    var arr = String(value).split(',');
//    if (type == "radio" || type == "checkbox") {
//      if (arr.length > 0) {
//        for (var i = 0; i < arr.length; i++) {

//          if (arr[i].split("|").length > 1) {
//            var person = { name: arr[i].split("|")[0], value: arr[i].split("|")[1] };
//            array.push(person);
//          }
//          else {
//            var person = { name: arr[i], value: arr[i] };
//            array.push(person);
//          }
//        }
//      }
//    }
//    else {
//      if (arr.length > 0) {
//        for (var i = 0; i < arr.length; i++) {
//          var person = { name: arr[i], value: arr[i] };
//          array.push(person);
//        }
//      }
//    }

//    return array;
//  }
//  MakeNormalArray(value) {

//    if (value) {
//      try {
//        return JSON.parse(value);
//      }
//      catch (ex) {
//        return value;
//      }
//    }
//    else {
//      value = [];
//    }
//  }
//  MakeSelectArray(objItem) {

//    var array = [];
//    var arr = String(objItem.select_options).split(',');
//    if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {

//      var person = { name: arr[0], value: arr[1] };
//      array.push(person);
//    }
//    return array
//  }

//}
