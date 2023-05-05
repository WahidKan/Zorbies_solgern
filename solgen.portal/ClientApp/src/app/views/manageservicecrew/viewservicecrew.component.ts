import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import {  Validators, FormGroup, FormControl } from '@angular/forms';
import { ManageservicecrewService } from './manageservicecrew.service';
import { CheckboxData } from '../solgencontactlist/customcontactlist.service';
import { AddeditservicecrewmemberComponent } from './manageservicecrewmemberpopup/addeditservicecrewmember.component';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { AddeditservicecrewpopupComponent } from './addeditservicecrewpopup/addeditservicecrewpopup.component';
import { Location } from '@angular/common';
import { ResourceskillComponent } from './resourceskill/resourceskill.component';
import { ServiceresourseService } from '../serviceresource/serviceresourse.service';

@Component({
  selector: 'app-viewservicecrew',
  templateUrl: './viewservicecrew.component.html'
})
export class ViewservicecrewComponent implements OnInit { 
  @ViewChild('resourceSkill', { static: false }) resourceSkill: ResourceskillComponent;
  @ViewChild('AddEditServiceCrewMember', { static: false }) ManageCrewMemberModal: AddeditservicecrewmemberComponent;
  @ViewChild('AddEditServiceCrew', { static: false }) ServiceCrewModal: AddeditservicecrewpopupComponent;
  lstSkill: any = {
    pager: {},
    data: []
  }
  Id: any;
  moduleName = 'serviceappointment';
  submoduleName = 'servicecrew';
  companyId: any;
  customCompnentValues: any=[];
  formControlList: any[] = [];
  form: FormGroup;
  loadSave = false;
  displayType = 'VIEW';
  ServiceCrewName: string = "";
  SkillPageNo: number = 1;
  lstServiceCrewMembers: any = {
    pager: {},
    data: [] 
  }
  lstServiceAppointments: any = {
    pager: {},
    data: [] 
  }
  SkillsCount: number = 0;
  ServiceCrewMembersCount: number = 0;
  ServiceAppointmentsCount: number = 0;

  pageNo: number = 0;
  pageSize: number = 4;
 
  sortDir: string = 'desc';
  sortColumn: any = 'id';

  ServiceCrewMemberPageNo: number = 1;
  proposalsPageNo: number = 1;
  leadsPageNo: number = 1;
  Resources: any = '-';
  ActualCrewSize: any = '0';
  customCompnentValuesTop: any = [];

  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  siteurl: string = '';
  contentHeader: object;
  constructor(
    private serviceresourseService: ServiceresourseService,
    private servicecrewService: ManageservicecrewService, private commanService: CommonService,
    private router: Router, private dialogService: ConfirmationDialogService, private toaster: ToastrService,
    private route: ActivatedRoute,
    private location: Location) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commanService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICECREWMEMBERADD');
    if (add == undefined) {
      add = "null";
    } else {     
      this.isAdd = true;
    }

    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICECREWMEMBERUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICECREWMEMBERDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  checkboxdata1: Array<CheckboxData> = [];
  checkboxdataTop: Array<CheckboxData> = [];

  ngOnInit() {
    this.siteurl = window.location.origin;
    // console.log('siteurl', this.siteurl);
    this.loadSave = true;
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.Id = id;
      })
    this.refreshResources();
    this.GetCustomFieldsList();
    this.GetCustomFieldsListTopRow();
    this.getRelatedData();
  

    this.initBreadCrumb();
    }

    initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Service Crews',
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
            name: 'Manage Service Crews',
            isLink: true,
            link: '/servicecrew'
          },
          {
            name: 'Service Crew Details',
            isLink: false
          }

        ]
    };
    }

  getRelatedData() {
    //added new
    this.refreshSkillsList();
    this.refreshServiceCrewMembersList();
    this.refreshServiceAppointmentList();
  }
  showEditServiceCrewPopup() {

    this.ServiceCrewModal.show(this.Id);
  }

  close() {
    this.router.navigateByUrl("/servicecrew");
  }
  GetCustomFieldsList() {
    this.displayType = 'VIEW';
    this.commanService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(resp => {

      if (resp) {
        this.formControlList = [];
        this.customCompnentValues = resp.data;
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

          if (cnt.ColumnName == 'Name') {
            this.ServiceCrewName = cnt.value;
          }
          if (cnt.name == 'Resources') {
            cnt.value = this.Resources;
          }

          if (cnt.name == 'ActualSize') {
            cnt.value = this.ActualCrewSize;
          }

          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });
        // console.log("group", group);
        this.form = new FormGroup(group);
        this.loadSave = false;
      }
    });

  }

  GetCustomFieldsListTopRow() {
    this.displayType = 'VIEW_TOP';
    this.loadSave = true;
    this.commanService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(resp => {
      if (resp) {
        this.customCompnentValuesTop = resp.data;

        this.customCompnentValuesTop.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          } else {
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
          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
              });
            }
          }
          if (cnt.name == 'ActualSize') {
            //;
            //val = this.ActualCrewSize;
            cnt.value = this.ActualCrewSize;
          }
        });
        this.loadSave = false;
      }
    });
  }

  onServiceCrewMembersSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshServiceCrewMembersList();
  }
  onServiceAppointmentSort($event) {
    debugger;
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.refreshServiceAppointmentList();
  }
  // added new 
  refreshSkillsList() {
    this.servicecrewService.refreshSkillsList(this.Id, this.sortColumn, this.sortDir, this.SkillPageNo, this.pageSize).subscribe(resp => {
      this.lstSkill = resp;
      this.SkillsCount = resp.pager.totalItems;
      // console.log("thiskil", this.lstSkill);
    });
  }
  setSkillPageNo($event) {
    this.SkillPageNo = $event.page;
    this.refreshSkillsList();
  }
  onSkillSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.name;
    this.refreshSkillsList();
  }
  openSkillPopup() {
    this.resourceSkill.show(this.Id);
  }
  resourceSkillEvent() {
    this.refreshSkillsList();
  }

  EditSkill(row) {
    this.resourceSkill.EditSkill(row);
  }


  deleteSkill(row, sectionName) {
    const message = `Are you sure you want to delete Service Skill?`;
    this.dialogService.confirm('Delete Service Skill', message).subscribe(confirmed => {
      if (confirmed) {
        this.serviceresourseService.DeleteRecords(row.Id, 'tblServiceResourceSkill').subscribe((res: any) => {
          this.toaster.success(`Service Skill has been deleted successfully..`);

          this.refreshSkillsList();
        });
      }
    });
  }

  //  ************   end *************

  refreshServiceCrewMembersList() {
    this.servicecrewService.GetServiceCrewMembersList(this.sortColumn, this.sortDir, this.ServiceCrewMemberPageNo, this.pageSize,this.Id).subscribe(resp => {
      this.lstServiceCrewMembers = resp;
      this.ServiceCrewMembersCount = resp.pager.totalItems;
    });
    //this.refreshResources();
  }
  refreshServiceAppointmentList() {
    this.servicecrewService.GetServiceAppointmentList(this.sortColumn, this.sortDir, this.ServiceCrewMemberPageNo, this.pageSize,this.Id).subscribe(resp => {
      this.lstServiceAppointments = resp;
      this.ServiceAppointmentsCount = resp.pager.totalItems;
    });
    //this.refreshResources();
  }

  setServiceCrewMemberPageNo($event) {
    this.ServiceCrewMemberPageNo = $event.page;
    this.refreshServiceCrewMembersList();
  }
  setServiceAppointmentPageNo($event) {
    this.ServiceCrewMemberPageNo = $event.page;
    this.refreshServiceAppointmentList();
  }

  ShowManageCrewMemberPopup(crewMemberId) {
    let CrewMemberId = crewMemberId;
    this.ManageCrewMemberModal.show(this.Id,this.ServiceCrewName,CrewMemberId);
  }

  refreshResources() {
    this.servicecrewService.GetServiceResourcesByServiceCrewId(this.Id).subscribe(lst => {

      if (lst) {
        let jsonData = JSON.parse(lst.responseMessage);
        this.Resources = jsonData.Resources;
        this.ActualCrewSize = jsonData.ActualSize;
      }
    });
  }

  deleteCrew(id, sectionName) {
    const message = `Are you sure you want to delete Service Crew Member?`;
    this.dialogService.confirm('Delete Service Crew Member', message).subscribe(confirmed => {
      if (confirmed) {
        this.servicecrewService.DeleteRecords(id, 'tblServiceCrewMember').subscribe((res: any) => {
          this.toaster.success(`Service Crew Member has been deleted successfully..`);
          this.ServiceCrewMemberPageNo = 1;
          this.refreshServiceCrewMembersList();
        });
      }
    });
  }
 
  refreshList() {
    this.GetCustomFieldsList();
    this.GetCustomFieldsListTopRow();
  }

  OnBackToListClick() {
    this.location.back();
  }
    
}
