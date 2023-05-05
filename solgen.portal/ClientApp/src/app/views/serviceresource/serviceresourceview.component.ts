import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CampaignTopViewModel, CheckboxData } from '../campaign/campaign.service';
import { ServiceresourseService } from './serviceresourse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResourceskillComponent } from './resourceskill/resourceskill.component';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceresourceterritoryviewComponent } from './resourceserviceterritory/serviceresourceterritoryview.component';
import { ServicecrewaddeditComponent } from './resourceserviicecrew/servicecrewaddedit.component';
import { ServiceappointmentComponent } from './serviceappointment/serviceappointment.component';
import { AbcenseaddeditComponent } from './abcenseaddeditpopup/abcenseaddedit.component';
import { CommonService } from '../shared/common.service';
import { Location } from '@angular/common';
import { ZonePriorityPopupComponent } from './zone-priority-popup/zone-priority-popup.component';

@Component({
  selector: 'app-serviceresourceview',
  templateUrl: './serviceresourceview.component.html',
  styleUrls: ['./serviceresourceview.component.scss']
})
export class ServiceresourceviewComponent implements OnInit {
  @ViewChild('resourceSkill', { static: false }) resourceSkill: ResourceskillComponent;
  @ViewChild('sourceterritory', { static: false }) sourceterritory: ServiceresourceterritoryviewComponent;
  @ViewChild('Servicecrew', { static: false }) Servicecrew: ServicecrewaddeditComponent;
  @ViewChild('ServiceAppointment', { static: false }) ServiceAppointment: ServiceappointmentComponent;
  @ViewChild('Serviceabcense', { static: false }) Serviceabcense: AbcenseaddeditComponent;
  @ViewChild("ZonePriority", { static: false }) ZonePriorityModel: ZonePriorityPopupComponent;

  Id: any;
  moduleName = 'serviceappointment';
  submoduleName = 'serviceresource';
  companyId: any;
  customCompnentValues: any;
  formControlList: any[] = [];
  form: FormGroup;
  loadSave = false;
  displayType = 'VIEW';
  ServiceResourceName: string = "";

  lstGetServiceTerritoryList: any = {
    pager: {},
    data: []
  }
  lstAppointments: any = {
    pager: {},
    data: []
  }
  lstSkill: any = {
    pager: {},
    data: []
  }
  lstServiceCrew: any = {
    pager: {},
    data: []
  }
  lstAbsence: any = {
    pager: {},
    data: []
  }
  countAbcense: number = 0;
  ServiceAppointmentsCount: any = 0;

  campaignMembersCount: number = 0;
  SkillsCount: number = 0;
  proposalsCount: number = 0;
  leadsCount: number = 0;
  countServiceCrew: number = 0;
  countAbsences: number = 0;
  pageNo: number = 1;
  pageSize: number = 4;
  SkillPageNo: number=1;
  sortDir: string = 'desc';
  sortColumn: any = 'CreatedOn';

  zoneSortDir: string = 'asc';
  zoneSortColumn: any = 'Priority';

  ZoneCount: number = 0;
  ZonePageNo: number = 1;
  lstZone: any = {
    pager: {},
    data: []
  }

  campaignMemberPageNo: number = 1;
  AppointmentPageNo: number = 1;
  AbcensePageNo: number = 1;
  CrewPageNo: number = 1;

  customCompnentValuesTop: any;
  checkboxdataTop: Array<CheckboxData> = [];
  siteurl: string = '';
  contentHeader: object;
  constructor(
    private serviceresourseService: ServiceresourseService,
    private router: Router, private dialogService: ConfirmationDialogService,
    private route: ActivatedRoute, private toaster: ToastrService, private commonService: CommonService, private location: Location) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  checkboxdata1: Array<CheckboxData> = [];


  ngOnInit() {
    this.siteurl = window.location.origin;
    // console.log('siteurl', this.siteurl);
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
       headerTitle: 'Manage Service Resource',
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
             name : 'Manage Service Resource',
             isLink : true,
             link : '/serviceresource'
           },
           {
             name: 'Service Resource Details',
             isLink: false
           }
  
         ]
     };
   }


  getRelatedData() {
    this.refreshServiceTerritoryList();
    this.refreshAppointmentList();
    this.GetServiceServiceCrewList();
    this.refreshSkillsList();
    this.GetAbcenseList();
    this.refreshZonePriorityList();
  }

  close() {
    this.router.navigateByUrl("/serviceresource");
  }
  GetCustomFieldsList() {
    this.displayType = "VIEW";
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = result.data;
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
           val = cnt.value == 1 ? 'checked' : null;
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
          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
                else {
                  //cnt.value = null;
                }
              });
            }
          }
          //this.EditAbcense
          //if (cnt.ColumnName == 'ResourceType' || cnt.ColumnName == 'SF_IsActive' ||  cnt.name == 'OwnerId' || cnt.ColumnName=='RelatedRecord_UserID' || cnt.ColumnName == 'StartDate' || cnt.ColumnName == 'EndDate') {
          //  let row: CampaignTopViewModel = new CampaignTopViewModel();
          //  if (cnt.ColumnName == 'RelatedRecord_UserID')
          //    row.DisplayOrder = 2;
          //  else if (cnt.ColumnName == 'OwnerId')
          //    row.DisplayOrder = 1;
          //  if (cnt.ColumnName == 'ResourceType')
          //    row.DisplayOrder = 3;
          //  else if (cnt.ColumnName == 'SF_IsActive')
          //    row.DisplayOrder = 4;
          //  else if (cnt.ColumnName == 'StartDate')
          //    row.DisplayOrder = 5;
          //  else if (cnt.ColumnName == 'EndDate')
          //    row.DisplayOrder = 6;
           

          //  row.ColumnName = cnt.ColumnName;
          //  row.DisplayName = cnt.display_name;
          //  row.Value = cnt.value;
          //  row.field_route = cnt.field_route;
          //  row.ref_value = cnt.ref_value;
          //  row.Value = cnt.value;
          //  this.customCompnentValuesTop.push(row);
          //  this.customCompnentValuesTop.sort((a, b) => a.DisplayOrder > b.DisplayOrder ? 1 : -1);
          //}
          //if (cnt.ColumnName == 'Name') {
          //  this.ServiceResourceName = cnt.value;
          //}

          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });
        this.form = new FormGroup(group);
        this.loadSave = false;

        this.GetCustomFieldsListTopRow();
      }
    });
  }

  GetCustomFieldsListTopRow() {
    this.displayType = 'VIEW_TOP';
    this.loadSave = true;
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(resp => {
      if (resp) {
        this.customCompnentValuesTop = resp.data;
        this.customCompnentValuesTop.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdataTop.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdataTop.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }

          if (cnt.ColumnName == 'Name') {
            this.ServiceResourceName = cnt.value;
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
        });
        
        this.customCompnentValuesTop = this.customCompnentValuesTop.filter(x => x.ColumnName != 'Name');
      }
    },
      err => {
        this.loadSave = false;
      },
      () => {
        this.loadSave = false
      });
  }







  onCampaignMembersSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.name;
    this.refreshServiceTerritoryList();
  }
  onAppointmentSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.name;
    this.refreshAppointmentList();
  }
  onProposalsSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.name;
    this.refreshAppointmentList();
  }
  onSkillSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.name;
    this.refreshSkillsList();
  }

  onZoneSort($event) {
    const sort = $event.sorts[0]
    this.zoneSortDir = sort.dir;
    this.zoneSortColumn = $event.column.name;
    this.refreshZonePriorityList();
  }

  onServiceServiceCrewSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.name;
    this.GetServiceServiceCrewList();
  }
  onAbsencesSort($event) {
    const sort = $event.sorts[0];
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.name;
    this.GetAbcenseList();
  }
 
  refreshServiceTerritoryList() {
    this.serviceresourseService.GetServiceTerritoryList(this.Id, this.sortColumn, this.sortDir, this.campaignMemberPageNo, this.pageSize).subscribe(resp => {
      this.lstGetServiceTerritoryList = resp;
      // console.log("ConsoleData", this.lstGetServiceTerritoryList);
      this.campaignMembersCount = resp.pager.totalItems;

    });
  }

  refreshAppointmentList() {
    this.serviceresourseService.refreshAppointmentList(this.Id, this.sortColumn, this.sortDir, this.AppointmentPageNo, this.pageSize).subscribe(resp => {
      this.lstAppointments = resp;
      this.ServiceAppointmentsCount = resp.pager.totalItems;
    });

  }

  refreshSkillsList() {
    this.serviceresourseService.refreshSkillsList(this.Id, this.sortColumn, this.sortDir, this.SkillPageNo, this.pageSize).subscribe(resp => {
      this.lstSkill = resp;
      this.SkillsCount = resp.pager.totalItems;
      // console.log("thiskil",this.lstSkill);
    });
  }

  refreshZonePriorityList() {
    this.serviceresourseService.GetSiteZonePriorityList(this.zoneSortColumn, this.zoneSortDir, this.ZonePageNo, this.pageSize, this.Id).subscribe(resp => {
      this.lstZone = resp;
      this.ZoneCount = this.lstZone.pager.totalItems;
      // console.log("lstZone", this.lstZone);
    });
  }

  GetServiceServiceCrewList() {
    this.serviceresourseService.GetServiceServiceCrewList(this.Id, this.sortColumn, this.sortDir, this.CrewPageNo, this.pageSize).subscribe(result => {
      this.lstServiceCrew = result;
      // console.log("crew", this.lstServiceCrew);
      this.countServiceCrew = result.pager.totalItems;
      // console.log("countServiceCrew", this.countServiceCrew);
    });
  }
  GetAbcenseList() {
    this.serviceresourseService.GetServiceGetAbcenseList(this.Id, this.sortColumn, this.sortDir, this.AbcensePageNo, this.pageSize).subscribe(result => {
      this.lstAbsence = result;
      // console.log("lstss", this.lstAbsence);
      // console.log("crew", this.lstServiceCrew);
      this.countAbcense = result.pager.totalItems;
      // console.log("countServiceCrew", this.countServiceCrew);
    });
  }
  
  setcampaignMemberPageNo($event) {
    this.campaignMemberPageNo = $event.page;
    this.refreshServiceTerritoryList();
  }

  setProposalsPageNo($event) {
    this.AppointmentPageNo = $event.page;
    this.refreshAppointmentList();
  }
  setSkillPageNo($event) {
    this.SkillPageNo = $event.page;
    this.refreshSkillsList();
  }
  setZonePageNo($event) {
    this.ZonePageNo = $event.page;
    this.refreshZonePriorityList();
  }
  setServiceCrewPageNo($event) {
    this.CrewPageNo = $event.page;
    this.GetServiceServiceCrewList();
  }
  setAppointmentPageNo
    ($event) {
    this.AppointmentPageNo = $event.page;
    this.refreshAppointmentList();
  }
  setAbsencesPageNo($event) {
    this.AbcensePageNo = $event.page;
    this.GetAbcenseList();
  }
  
  openSkillPopup() {
    this.resourceSkill.show(this.Id);
  }
  openServiceTerritoriesPopup() {
    this.sourceterritory.show(this.Id);
  }
  openServiceCrewPopup() {
    this.Servicecrew.show(this.Id);
  }
 
  openServiceAppointmentsPopup() {
    this.ServiceAppointment.show(this.Id);
  }
  openServiceAbcensePopup() {
    this.Serviceabcense.show(this.Id);
  }
  EditSkill(row) {
    this.resourceSkill.EditSkill(row);
  }
  EditTerritory(row) {
    this.sourceterritory.EditTerritory(row);
  }
  EditCrew(row) {
    this.Servicecrew.EditCrew(row);
  }
  EditAbcense(row) {
    this.Serviceabcense.EditAbcense(row);
  }
  resourceSkillEvent() {
    this.refreshSkillsList();
  }
  resourceSourceterritoryEvent() {
    this.refreshServiceTerritoryList();
  }
  resourceServicecrewEvent() {
    this.GetServiceServiceCrewList();
  }
  EditAppoimentment(row) {
    this.ServiceAppointment.EditAppoimentment(row);
  }
  resourceServiceAppointmentEvent() {
    this.refreshAppointmentList();
  }
  resourceSourceServiceabcenseEvent() {
    this.GetAbcenseList();
  }
 
  deleteSkill(row, sectionName) {
    const message = `Are you sure you want to delete Service Skill?`;
    this.dialogService.confirm('Delete Service Skill', message).subscribe(confirmed => {
      if (confirmed) {
        this.serviceresourseService.DeleteRecords(row.Id, 'tblServiceResourceSkill').subscribe((res: any) => {
          this.toaster.success(`Service Skill has been deleted successfully..`);
          this.SkillPageNo = 1;
          this.refreshSkillsList();
        });
      }
    });
  }

  deleteTerritory(row, sectionName) {
    const message = `Are you sure you want to delete Service Territory Member?`;
    this.dialogService.confirm('Delete Service Territory Member', message).subscribe(confirmed => {
      if (confirmed) {
        this.serviceresourseService.DeleteRecords(row.territoryId, 'tblServiceTerritoryMember').subscribe((res: any) => {
          this.toaster.success(`Service Territory Member has been deleted successfully..`);

          this.refreshServiceTerritoryList();
        });
      }
    });
  }

  deleteCrew(row, sectionName) {
    const message = `Are you sure you want to delete Service Crew Member?`;
    this.dialogService.confirm('Delete Service Crew Member', message).subscribe(confirmed => {
      if (confirmed) {
        this.serviceresourseService.DeleteRecords(row.crewMemberId, 'tblServiceCrewMember').subscribe((res: any) => {
          this.toaster.success(`Service Crew Member has been deleted successfully..`);

          this.GetServiceServiceCrewList();
        });
      }
    });
  }

  deleteAppoimentment(row, sectionName) {
    const message = `Are you sure you want to delete Service Appointment?`;
    this.dialogService.confirm('Delete Service Appointment', message).subscribe(confirmed => {
      if (confirmed) {
        this.serviceresourseService.DeleteRecords(row.Id, 'tblAssignedResource').subscribe((res: any) => {
          this.toaster.success(`Service Appointment has been deleted successfully..`);

          this.refreshAppointmentList();
        });
      }
    });
  }

deleteAbcense(row, sectionName) {
  const message = `Are you sure you want to delete this absence record?`;
  this.dialogService.confirm(' DELETE ABSENCE', message).subscribe(confirmed => {
      if (confirmed) {
        this.serviceresourseService.DeleteRecords(row.abcenceId, 'tblResourceAbsence').subscribe((res: any) => {
          this.toaster.success(`Absence record has been deleted successfully.`);

          this.GetAbcenseList();
        });
      }
    });
}

 OnBackToListClick() {
    this.location.back();
 }

  showZonePropertyPopup(edit: boolean) {
    this.ZonePriorityModel.show(this.Id, edit);
  }

   // this.router.navigateByUrl("/lease/inprogresslease",this.inter);
}
