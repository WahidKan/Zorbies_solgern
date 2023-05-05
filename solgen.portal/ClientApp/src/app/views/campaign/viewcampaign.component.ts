import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { CampaignService, CheckboxData, lstRelatedModel, CampaignTopViewModel } from './campaign.service';

@Component({
  selector: 'app-viewcampaign',
  templateUrl: './viewcampaign.html'
})
export class viewcampaignComponent implements OnInit {
  Id: any;
  moduleName = 'crm';
  submoduleName = 'campaign';
  companyId: any;
  customCompnentValues: any;
  formControlList: any[] = [];
  form: FormGroup;
  loadSave = false;
  displayType = 'VIEW';
  CampaignName: string = "";

  lstCampaignMembers: any = {
    pager: {},
    data:[]
  }
  lstProposals: any = {
    pager: {},
    data: []
  }
  lstLeads: any = {
    pager: {},
    data: []
  }

  campaignMembersCount: number=0;
  proposalsCount: number = 0;
  leadsCount: number = 0;

  pageNo: number = 0;
  pageSize: number = 4;
  sortDir: string='desc';
  sortColumn: any ='id';

  campaignMemberPageNo: number = 1;
  proposalsPageNo: number = 1;
  leadsPageNo: number = 1;
  contentHeader: object;

  customCompnentValuesTop: Array<CampaignTopViewModel> = [];
  constructor(
    private commonService: CommonService,
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute, ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  checkboxdata1: Array<CheckboxData> = [];


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
       headerTitle: 'Manage Campaign',
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
             name : 'Manage Campaign',
             isLink : true,
             link : '/campaign'
           },
           {
             name: 'Campaign Details',
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
    this.campaignService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {

      // console.log("data", this.campaignService.customFieldsList.data);
      if (result) {
        this.customCompnentValues = this.campaignService.customFieldsList.data;
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
            this.customCompnentValuesTop.sort((a, b) => a.DisplayOrder > b.DisplayOrder?1:-1);
          }
          if (cnt.ColumnName == 'CampaignName') {
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
    this.campaignService.GetCampaignMembersList(this.Id, this.sortColumn, this.sortDir, this.campaignMemberPageNo, this.pageSize).subscribe(resp => {
      this.lstCampaignMembers = resp;
      this.campaignMembersCount = resp.pager.totalItems;

    });
  }

  refreshProposalsList() {
    this.campaignService.GetCampaignProposalsList(this.Id, this.sortColumn, this.sortDir, this.proposalsPageNo, this.pageSize).subscribe(resp => {
      this.lstProposals = resp;
      this.proposalsCount = resp.pager.totalItems;
    });

  }

  refreshLeadsList() {
    this.campaignService.GetCampaignLeadsList(this.Id, this.sortColumn, this.sortDir, this.leadsPageNo, this.pageSize).subscribe(resp => {
      this.lstLeads = resp;
      this.leadsCount = resp.pager.totalItems;
    });
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
}
