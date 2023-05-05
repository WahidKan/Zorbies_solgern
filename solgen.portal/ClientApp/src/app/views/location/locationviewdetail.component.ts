import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { LocationService, CampaignTopViewModel } from './locationlist.service';
import { CheckboxData } from '../opportunity/opportunitylist.service';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { DateTimeToLocalForAddEditPipe } from 'src/app/pipes/datetime.pipe';
import { MappingLocationsComponent } from '../shared/mapping-locations/mapping-locations.component';
import { MappingMembersComponent } from '../shared/mapping-members/mapping-members.component';

@Component({
  selector: 'app-locationviewdetail',
  templateUrl: './locationviewdetail.component.html',
  styleUrls: ['./locationviewdetail.component.scss']
})
export class LocationviewdetailComponent implements OnInit {
  @ViewChild('listmappinglocationmodel', { static: false }) addNewMappingLocationPopupModel: MappingLocationsComponent;
  @ViewChild('listmappingmembersmodel', { static: false }) addNewMappingMemberPopupModel: MappingMembersComponent;
  Id: any;
  moduleName = 'location';
  submoduleName = 'locations';
  companyId: any;
  customCompnentValues: any;
  formControlList: any[] = [];
  formControlListSorted: any[] = [];
  form: FormGroup;
  loadSave = false;
  displayType = 'VIEW';
  CampaignName: string = "";
  addressLocation: any;
  addressLabel: string = '';
  lstCampaignMembers: any = {
    pager: {},
    data: []
  }
  lstProposals: any = {
    pager: {},
    data: []
  }
  lstLeads: any = {
    pager: {},
    data: []
  }

  campaignMembersCount: number = 0;
  proposalsCount: number = 0;
  leadsCount: number = 0;

  pageNo: number = 0;
  pageSize: number = 4;
  sortDir: string = 'desc';
  sortColumn: any = 'id';

  campaignMemberPageNo: number = 1;
  proposalsPageNo: number = 1;
  leadsPageNo: number = 1;

  customCompnentValuesTop: Array<CampaignTopViewModel> = [];
  isViewMappingLocation: boolean;
  isViewMappingMember: boolean;
  mappingLocationtitle: string;
  mappingMembertitle: string;
  MappingLocationCount: number;
  MappingMemberCount: number;
  contentHeader: object;
  constructor(
    private locationService: LocationService,
    private router: Router, private location: Location,
    private route: ActivatedRoute,) { }
  checkboxdata1: Array<CheckboxData> = [];
  private datePipe: DatePipe


  ngOnInit() {
    this.loadSave = true;
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.Id = id;
      })
    this.GetCustomFieldsList();
    this.getRelatedData();
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
            name: 'Location Details',
            isLink: false
          }
 
        ]
    };
  }
  
  getRelatedData() {
    this.refreshMembersList();
    this.refreshProposalsList();
    this.refreshLeadsList();
  }

  close() {
    this.router.navigateByUrl("/campaign");
  }
  GetCustomFieldsList() {
    this.locationService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.locationService.customFieldsList.data;
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
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? 'checked' : null;
          } else {
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
          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
              });
            }
          }

          if (cnt.ColumnName == 'Type' || cnt.ColumnName == 'Status' || cnt.ColumnName == 'StartDate' || cnt.ColumnName == 'EndDate') {

            let row: CampaignTopViewModel = new CampaignTopViewModel();

            if (cnt.ColumnName == 'Type')
              row.DisplayOrder = 1;
            else if (cnt.ColumnName == 'Status')
              row.DisplayOrder = 2;
            else if (cnt.ColumnName == 'StartDate')
              row.DisplayOrder = 3;
            else if (cnt.ColumnName == 'EndDate')
              row.DisplayOrder = 4;

            row.ColumnName = cnt.ColumnName;
            row.DisplayName = cnt.display_name;
            row.Value = cnt.value;
            this.customCompnentValuesTop.push(row);
            this.customCompnentValuesTop.sort((a, b) => a.DisplayOrder > b.DisplayOrder ? 1 : -1);
          }
          if (cnt.ColumnName == 'LocationName') {
            this.CampaignName = cnt.value;
          }

          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });
        this.form = new FormGroup(group);
        this.formControlList.forEach((item) => {
          if (item.group_name == "Location Details") {
            this.formControlListSorted[0] = item;
          }
          else if (item.group_name == "Address Information") {

            let country, state, city, street, lat, lng;
            item.InnerData.forEach((element, index) => {
              if (element.name == "VisitorAddress") {
              }
              if (element.name == "Longitude") {
              }
              switch (element.name) {

                case "VisitorAddress":
                  this.addressLocation = element.value;
                  break;
                case "Country":
                  country = element.value;
                  break;
                case "State":
                  state = element.value;
                  break;
                case "City":
                  city = element.value;
                  break;
                case "StreetName":
                  street = element.value;
                  break;
                case "Lattitude":
                  lat = element.value;
                  break;
                case "Longitude":
                  element.display_name = 'Latitude & Longitude';
                  lng = element.value;
                  break;
                default:
                  break;
              }
            });
            let visitorAdd = item.InnerData.find(x => x.ColumnName == 'VisitorAddress')
            let longitude = item.InnerData.find(x => x.ColumnName == 'Longitude')
            visitorAdd = street + ' ' + city + ' ' + state + ' ' + country + ' ';

            let longLatArray: string[] = [];

            if (lat)
              longLatArray.push(lat);

            if (lng)
              longLatArray.push(lng);

            if (longLatArray.length > 0) {
              longitude.value = longLatArray.join(', ');
            }

            // let addressArray: string[] = [];
            // if (street)
            //   addressArray.push(street);
            // if (city)
            //   addressArray.push(city);
            // if (state)
            //   addressArray.push(state);
            // if (country)
            //   addressArray.push(country);

            // if (addressArray.length > 0) {
            //   this.addressLabel = addressArray.join(', ');
            // }
            this.formControlListSorted[1] = item;

          }
          else if (item.group_name == "System Information") {
            this.formControlListSorted[2] = item;
          }
        });
        this.formControlList = [];
        this.formControlListSorted[1].InnerData = this.formControlListSorted[1].InnerData.filter(x => x.display_name == 'Street Name' ||x.display_name == 'Country Name' || x.display_name == 'State Name' || x.display_name == 'City Name' || x.display_name == 'Zip Code'  || x.display_name == 'Latitude & Longitude');
        this.formControlList = this.formControlListSorted;
        this.loadSave = false;
      }
    });

    // console.log("row", this.customCompnentValuesTop);
  }

  onCampaignMembersSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.name;
    this.refreshMembersList();
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

  onProposalsSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.name;
    this.refreshProposalsList();
  }

  onLeadsSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.name;
    this.refreshLeadsList();
  }

  refreshMembersList() {
    //this.locationService.GetCampaignMembersList(this.Id, this.sortColumn, this.sortDir, this.campaignMemberPageNo, this.pageSize).subscribe(resp => {
    //  this.lstCampaignMembers = resp;
    //  this.campaignMembersCount = resp.pager.totalItems;

    //});
  }

  refreshProposalsList() {
    //this.locationService.GetCampaignProposalsList(this.Id, this.sortColumn, this.sortDir, this.proposalsPageNo, this.pageSize).subscribe(resp => {
    //  this.lstProposals = resp;
    //  this.proposalsCount = resp.pager.totalItems;
    //});

  }

  refreshLeadsList() {
    //this.locationService.GetCampaignLeadsList(this.Id, this.sortColumn, this.sortDir, this.leadsPageNo, this.pageSize).subscribe(resp => {
    //  this.lstLeads = resp;
    //  this.leadsCount = resp.pager.totalItems;
    //});
  }

  setcampaignMemberPageNo($event) {
    this.campaignMemberPageNo = $event.page;
    this.refreshMembersList();
  }

  setProposalsPageNo($event) {
    this.proposalsPageNo = $event.page;
    this.refreshProposalsList();
  }

  setLeadsPageNo($event) {
    this.leadsPageNo = $event.page;
    this.refreshLeadsList();
  }
  OnBackToListClick() {
    this.location.back();
  }

  // =============================== mapping location start ==============================
  addMappingLocationItems(newItem: number) {
    this.MappingLocationCount = newItem;
  }
  AddMappingLocations() {
    this.isViewMappingLocation = false;
    this.mappingLocationtitle = "Add Mapping Location";
    this.addNewMappingLocationPopupModel.show();
    //this.addNotesPopupModel.show();
  }
  // =============================== mapping location end ==================================

  // =============================== mapping members start =================================
  addMappingMembersItems(newItem: number) {
    this.MappingMemberCount = newItem;
  }
  AddMappingMembers() {
    this.isViewMappingLocation = false;
    this.mappingMembertitle = "Add Mapping Member";
    this.addNewMappingMemberPopupModel.show();
    //this.addNotesPopupModel.show();
  }
  // =============================== mapping members end ===================================
}
