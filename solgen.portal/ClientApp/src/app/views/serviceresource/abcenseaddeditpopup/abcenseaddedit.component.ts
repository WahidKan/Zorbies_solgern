import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { UserService } from '../../shared/user.service';
import { ServiceresourseService, AbcenseModel } from '../serviceresourse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DateTimeToLocalForAddEditPipe } from '../../../pipes/datetime.pipe';
import { ScriptService } from '../../shared/scriptservice.service';

declare var google: any;
@Component({
  selector: 'app-abcenseaddedit',
  templateUrl: './abcenseaddedit.component.html',
  styleUrls: ['./abcenseaddedit.component.scss']
})
export class AbcenseaddeditComponent implements OnInit {
  @ViewChild('mapLocation', { static: false }) mapLocation: ModalDirective;
  @ViewChild('Serviceabcense', { static: false }) modalSourceServiceabcense: ModalDirective;
  @Output() resourceSourceServiceabcenseEvent = new EventEmitter();
  active = false;
  appointments: any;
  customers: any;
  lstappointment: any;
  lstappointmentstatus: any;
  isDateChanged: any = true;
  RecordType = false;
  RecordTypePage = false;
  lstResource: any;
  appmodel: AbcenseModel = new AbcenseModel();
  fTime: Date = new Date(0);
  Tdate: Date = new Date(0); customerID: any;
  utcDate: Date;
  appId: any;
  addOrUpdatePermission: boolean;
  //modulePermission: ModuleList;
  title: any;
  minimumDate = new Date();
  isEdit = false;
  startDateModel: any;
  minToTime: Date;
  maxToTime: Date;
  addForm: FormGroup;
  RecordTypes: any;
  minFromTime: Date;
  internalabcenId: any;
  lstState: any; checked: any;
  lstCountry: any;
  todate: Date;
  lstTerritoryType: any;
  lstTerritory: any;
  selected: any;
  lstType: any;
  lstRecoardType: any = [];
  lstOperatingHours: any;
  editData: any;
  interResourceId: any;
  lstResourceSkill: any;
  maxDate: Date;
  minDate: Date;
  loadSave: boolean = false;
  options: any;
  overlays: any[];
  geocoder: any;
  customCompnentValues: any;
  datetime = new DateTimeToLocalForAddEditPipe;


  constructor(private fb: FormBuilder,
    private commonService: CommonService, private userService: UserService,
    private serviceresourseService: ServiceresourseService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private dynamicScripts: ScriptService) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.dynamicScripts.load('map');
    //this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    this.initForm();
    this.getServiceResourceType();

    setTimeout(() => {
      this.options = {
        center: { lat: 47.751076, lng: -120.740135 },
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.overlays = [];
      this.autotext();
    }, 1000);

    let today = new Date();
    this.minDate = today;
    this.maxDate = this.minDate;

  }


  show(id) {
    debugger;
    this.getServiceResourceType();
    // this.title = 'ADD ABSENCE : ' + this.lstRecoardType[0].text;
    // this.RecordTypes = this.lstRecoardType[0].values;
    // this.RecordType = true;
    // this.recordType.setValue(this.lstRecoardType[0].value);
    this.internalabcenId = null;
    this.interResourceId = id;
    this.serviceResource.setValue(this.interResourceId);
    this.getServiceResource(this.interResourceId);
    this.getState();
    this.getType();
    this.getCountry();//ResourceAbsenceType
    this.modalSourceServiceabcense.show();

  }

  EditAbcense(row) {
    this.getServiceResourceType();
    this.getServiceResource(row.serviceResource);
    // this.recordType.setValue(this.lstRecoardType.value);
    this.lstRecoardType.value = row.recordType;
    //row.recordType = this.lstRecoardType.value;
    this.title = 'EDIT ABSENCE: ' + this.lstRecoardType.text;
    this.getState();
    this.getType();
    this.isEdit = true;
    this.getCountry();
    // this.getServiceResourceType();
    this.editData = row;
    this.interResourceId = row.serviceResource;
    this.internalabcenId = row.abcenceId;
    this.startDateModel = row.startDate;
    this.addForm.get('serviceResource').disable();
    const datetime = new DateTimeToLocalForAddEditPipe;
    let SDate: Date = datetime.transform(row.startDate, null);
    let EDate = datetime.transform(row.endDate, null);
    if (row.recordType != null && row.recordType != '') {
      this.lstRecoardType.forEach(itemList => {
        if (itemList.value == row.recordType) {
          this.title = "EDIT ABSENCE: " + itemList.text;
          this.RecordTypes = row.recordType;
        }
      });
    }

    this.isDateChanged = false;
    //this.internalabcenId=row.abcenceId;
    let serviaceResources;
    this.recordType.setValue(row.recordType);
    if (row.serviceResource != null && row.serviceResource != '') {
      serviaceResources = row.serviceResource.toString();
    }
    this.isEdit = true;
    this.addForm.patchValue({
      id: row.abcenceId,
      serviceResource: this.interResourceId == null ? null : this.interResourceId.toString(),
      recordType: row.recordType == null ? null : row.recordType.toString(),
      type: row.type == null ? null : row.type.toString(),
      country: row.country == null ? null : parseInt(row.country),
      addressDes: row.addressDes,
      description: row.description,
      ganttLabel: row.ganttLabel,
      city: row.city,
      state: row.state == null ? null : row.state.toString(),
      zipCode: row.zipCode,
      startDate: SDate,
      endDate: EDate,
    })
    this.RecordType = true;
    this.modalSourceServiceabcense.show();
  }
  redioButtonEvents(event: string, text) {

    this.RecordTypes = event;
    this.addForm.controls['recordType'].patchValue(event.toString());
    if (this.isEdit == true) {
      this.title = "Edit Resource Absence : " + text
    }
    else {
      this.title = 'New Resource Absence : ' + text
    }

  }
  setvaluesFroHideTabs(row) {
    let SDate: Date = this.datetime.transform(row.startDate, null);
    let EDate = this.datetime.transform(row.endDate, null);

    this.addForm.patchValue({
      id: row.abcenceId,
      serviceResource: this.interResourceId == null ? null : this.interResourceId.toString(),
      recordType: row.recordType == null ? null : row.recordType.toString(),
      type: row.type == null ? null : row.type,
      country: row.country == null ? null : parseInt(row.country),
      addressDes: row.addressDes,
      description: row.description,
      ganttLabel: row.ganttLabel,
      city: row.city,
      state: row.state == null ? null : parseInt(row.state),
      zipCode: row.zipCode,
      startDate: SDate,
      endDate: EDate,
    })
  }
  getState() {

    this.commonService.getStatesList().subscribe(res => {
      this.lstState = this.commonService.states;
    });
  }
  getType() {
    this.commonService.getMasterItemsList('ResourceAbsenceType').subscribe((result: any) => {
      this.lstType = this.commonService.masters;
      // console.log("Resource", this.lstResource);
    })
  }
  //ServiceResourceRecoardType
  getServiceResourceType() {
    this.commonService.getMasterItemsList('ServiceResourceRecoardType').subscribe((result: any) => {
      this.lstRecoardType = this.commonService.masters;
      // console.log("lstRecoardType", this.lstRecoardType);
      debugger;
      this.title = 'ADD ABSENCE';
      if (this.lstRecoardType.length > 0) {
        this.title = 'ADD ABSENCE : ' + this.lstRecoardType[0].text;
        this.RecordTypes = this.lstRecoardType[0].values;
        this.RecordType = true;
        this.recordType.setValue(this.lstRecoardType[0].value);
      }
    })
  }
  getCountry() {
    this.serviceresourseService.getCountryList().subscribe((result: any) => {
      this.lstCountry = result;
    })
  }
  getServiceResource(id) {
    this.commonService.getMasterSubModuleList(id, 'ServiceResource').subscribe((result: any) => {
      this.lstResource = this.commonService.masters;
      // console.log("Resource", this.lstResource);
    })
  }
  Next() {
    //if (this.addForm.valid) {
    //this.title = 'New Resource Absence';//+ this.addForm.value.recordType //'New Resource Absence 222222 :';
    if (this.editData != null && this.editData != '' && this.internalabcenId != null) {
      this.setvaluesFroHideTabs(this.editData);
    }

    this.RecordType = false;
    this.RecordTypePage = true;
    //}
    //else {
    //  this.commonService.validateAllFormFields(this.addForm);
    //}

    //this.title

  }


  close() {
    this.active = false;
    this.RecordType = false;
    this.RecordTypePage = false;
    this.addForm.reset();
    this.title = '';
    this.modalSourceServiceabcense.hide();
  }
  get id() { return this.addForm.get('id'); }
  get recordType() { return this.addForm.get('recordType'); }
  get serviceResource() { return this.addForm.get('serviceResource'); }
  get type() { return this.addForm.get('type'); }
  get startDate() { return this.addForm.get('startDate'); }
  get endDate() { return this.addForm.get('endDate'); }
  get description() { return this.addForm.get('description'); }
  get ganttLabel() { return this.addForm.get('ganttLabel'); }
  get country() { return this.addForm.get('country'); }
  get addressDes() { return this.addForm.get('addressDes'); }

  get city() { return this.addForm.get('city'); }
  get state() { return this.addForm.get('state'); }
  get zipCode() { return this.addForm.get('zipCode'); }

  private initForm() {
    this.addForm = this.fb.group({
      id: [null],
      recordType: ['', Validators.required],
      serviceResource: [null, Validators.required],
      type: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      description: [null],
      ganttLabel: [null],
      country: [null],
      addressDes: [null],
      city: [null],
      state: [null],
      zipCode: [null, [Validators.nullValidator, Validators.pattern("^[0-9]*$")]],
    })
  }

  Save() {
    this.getServiceResourceType();
    if (this.addForm.valid) {
      this.appmodel.id = this.addForm.value.id;
      this.appmodel.recordType = (this.RecordTypes == undefined ? this.lstRecoardType[0].value : this.RecordTypes);  // this.addForm.value.recordType;
      this.appmodel.serviceResource = this.interResourceId;
      this.appmodel.type = this.addForm.value.type;
      this.appmodel.description = this.addForm.value.description;
      this.appmodel.country = this.addForm.value.country;
      this.appmodel.addressDes = this.addForm.value.addressDes;
      this.appmodel.city = this.addForm.value.city;
      this.appmodel.state = this.addForm.value.state;
      this.appmodel.zipCode = this.addForm.value.zipCode;
      this.appmodel.ganttLabel = this.addForm.value.ganttLabel;
      this.startDate;
      //var ddd = this.startDate.getUTCDate();
      //this.appmodel.startDate = (this.startDate.value == null) ? null : this.datetime.transform(this.startDate.value, null); //this.commonService.getUserSelectedZoneToUTC(data);
      this.appmodel.startDate = (this.startDate.value == null) ? null : this.commonService.getUserSelectedZoneToUTC(this.startDate.value);

      //this.appmodel.endDate = (this.endDate.value == null) ? null : this.datetime.transform(this.endDate.value, null);
      this.appmodel.endDate = (this.endDate.value == null) ? null : this.commonService.getUserSelectedZoneToUTC(this.endDate.value);
      this.serviceresourseService.addeditServiceabcense(this.appmodel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          //this.router.navigate(["/calendar"]);
          this.addForm.reset();
          this.RecordType = false;
          this.RecordTypePage = false;
          this.title = '';
          this.modalSourceServiceabcense.hide();
          this.resourceSourceServiceabcenseEvent.emit();
        }
        else {
          //this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        //this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
    }
  }
  //-------------------------configuaration for calender datetime validations start here
  //-------------------------author: Prince Singh on 08-02-2021
  StartDate: any;
  EndDate: any;

  GetCompareDateTimeResult(sDate, eDate, sTitle, eTitle) {
    ;
    this.StartDate = sDate;
    this.EndDate = eDate;

    let startDateValue, endDateValue;

    startDateValue = this.sDate.value;
    endDateValue = this.eDate.value;

    this.resetDateTimeValidators();

    if (endDateValue) {
      if (startDateValue > endDateValue) {
        this.sDate.setErrors({ "message": sTitle + "  must be less than from  " + eTitle });

        this.eDate.setErrors({ "message": eTitle + " must be greater than from  " + sTitle });
      }
      else {
        this.resetDateTimeValidators();
      }
    }
    else {
      this.resetDateTimeValidators();
    }

  }
  get sDate() {
    return this.addForm.get(this.StartDate);
  }

  get eDate() {
    return this.addForm.get(this.EndDate);
  }

  resetDateTimeValidators() {

    this.sDate.setErrors(null);
    this.eDate.setErrors(null);

    this.sDate.clearValidators;
    this.sDate.updateValueAndValidity();

    this.eDate.clearValidators;
    this.eDate.updateValueAndValidity();
  }
  //-------------------------configuaration for calender datetime validations end here

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
        let streetvalue = '', routevalue = '';
        place.address_components.forEach(p => {

          p.types.forEach(s => {
            //// console.log('s', s);
            if (s == 'country') {
              try {
                let _countryValue = this.lstCountry.filter(x => x.text == p.long_name)[0].value;
                this.country.setValue(_countryValue);
              }
              catch { }
            }
            if (s == 'administrative_area_level_1') {
              try {
                //;
                let _stateValue = this.lstState.filter(x => x.text == p.long_name)[0].value;
                this.state.setValue(_stateValue);
              } catch { }
            }
            if (s == 'postal_code') {
              this.zipCode.setValue(p.long_name);
            }
            if (s == 'locality') {
              this.city.setValue(p.long_name);
            }
            if (s == 'street_number') {
              streetvalue = p.long_name;
            }
            if (s == 'route') {
              routevalue = p.long_name;
            }

          })
        })
        this.addressDes.setValue(streetvalue + ' ' + routevalue);
      }
      this.closemapsearch();

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
