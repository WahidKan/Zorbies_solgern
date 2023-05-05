import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { EmailTemplateService } from '../emailtemplate/emailtemplate.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { LeadlistService } from '../lead/leadlist.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProposallistService, CheckboxData } from './proposallist.service';
import { ProposallineitempopupComponent } from './productlineitempopup/proposallineitempopup.component';

@Component({
  selector: 'app-proposalview',
  templateUrl: './proposalview.component.html',
  styleUrls: ['./proposalview.component.scss']
})
export class ProposalviewComponent implements OnInit {
  @ViewChild('proposalpopup', { static: false }) proposalpopup: ProposallineitempopupComponent;
  AssociatedproductpagedData: any = {
    pager: {},
    data: []
  };
  stagelist: [];
  oplist: [];
  emailfilter: any;
  objectname = 'proposal';
  substagename: any;
  createdby: any;
  lstfiletype: any;
  lstPageSize: any;
  sortColumn: any;
  listFilter: any;
  //loading: any;
  sortDir = 'desc';
  pageSizeValue = 10;
  userName: any;
  loginuserid: any;
  group_id: any;
  moduleName = 'crm';
  submoduleName = 'proposal';
  group_name: any;
  formControlList: any[] = [];
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  submoduleid: any;
  proposalId: any;
  lstPageSizeAssociateProduct: any;
  opportunityId: any;
  userId: any;
  loadSave: boolean = false;
  loading = false;
  contentHeader: object;
  constructor(private route: ActivatedRoute,
    private commonService: CommonService,
    private fb: FormBuilder,
    private emailTemplateService: EmailTemplateService,
    private dashboardService: DashboardService,
    private dialogService: ConfirmationDialogService,
    private leadservice: LeadlistService,
    private router: Router,
    private proposallistService: ProposallistService,
    private toaster: ToastrService, ) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
    });}
  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {
    this.loadSave = true;
    this.sortColumn = 'createdOn';
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.proposalId = id;
        localStorage.setItem('opid', this.proposalId);
      })
    this.GetAssociateProductList();
    this.getPageSizes();
    this.pageSizeValue = 10;

    this.proposallistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.proposalId, typeof this.opportunityId =='undefined' ? '' : this.opportunityId,'VIEW').subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.proposallistService.customFieldsList.data;

        // // console.log("this.customCompnentValues", this.customCompnentValues);

        let fieldArray = [];
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
          }
          else if (cnt.dt_code == 'date' || cnt.actual_data_type == 'date') {
            if (cnt.value == "") {
              val = null;
            } else {
              let val1 = new Date(cnt.value);
              val = val1.getMonth() + 1 + '/' + val1.getDate() + '/' + val1.getFullYear();
            }
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
          
          if (cnt.dt_code == 'select' && cnt.value != '') {
            
            if (cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
              });
            } else{
              cnt.value = null;
            }
            
          }
          if (this.opportunityId > 0 && cnt.name == 'OpportunityId') {
            cnt.is_required = true;
            val = this.opportunityId;
          }
          if (this.opportunityId > 0 && cnt.name == 'AccountId') {
            val = cnt.select_options[0].value;
            cnt.is_required = true;
          }
          if (cnt.name == 'OwnerId') {
            val = this.userName;
          }


          // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9][0-9][0-9]?)?") :
                Validators.nullValidator
          ])

        });

        this.form = new FormGroup(group);
        // // console.log("validationFROM", this.form);
        setTimeout(() => {
          this.loadSave = false;
        }, 1000);
      
      }
    });
  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Proposal',
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
             name: 'Manage Proposal',
             isLink: true,
             link: '/proposal-list'
           },
           {
             name: 'Proposal Details',
             isLink: false
           }
  
         ]
     };
   }

  GetAssociateProductList() {

    this.proposallistService.GetAssociateProductWithProposalLineItemList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.proposallistService.pagedData;
      // // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);

    })
  }

  GetProposalList() {
    this.proposalpopup.show(this.proposalId,this.opportunityId,'',false);
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
      this.lstPageSizeAssociateProduct = this.commonService.masters;
    })
  }


  setPageAssociateProduct($event) {
    this.loading = true;
    let currentPageSalesUserList = $event.page - 1;
    //this.opportunityId = opportunityId;
    this.proposallistService.GetAssociateProductWithProposalLineItemList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, currentPageSalesUserList, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.AssociatedproductpagedData = this.proposallistService.pagedData;
      // this.selected;
      //this.AssociatedproductpagedData = this.currentPageSalesUserList;
      this.loading = false;
    }, error => {
      this.loading = false;
    });

  }
  onChangeAssociateProduct($event) {
    this.loading = true;
    this.proposallistService.GetAssociateProductWithProposalLineItemList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.AssociatedproductpagedData = this.proposallistService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.proposallistService.GetAssociateProductWithProposalLineItemList(this.proposalId, this.opportunityId, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.proposallistService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  lineItem() {
    this.GetAssociateProductList();
  }
  deleteAssociateproduct(row) {
    const message = `Are you sure you want to delete Product "${row.ProductName}"?`;
    this.dialogService.confirm('Delete Product', message).subscribe(confirmed => {
      if (confirmed) {
        this.proposallistService.DeleteProduct(row.lineItemId.toString()).subscribe((response: any) => {
          if (response.statusCode == 200) {
            this.toaster.success(`Product "${row.ProductName}"" has been deleted successfully`);
            this.GetAssociateProductList();
          }
          else {
            this.toaster.error(response.responseMessage);
          }
        }, error => {

        });
      }
    });
  }

  editProduct(row) {
    this.proposalpopup.show(this.proposalId, this.opportunityId, row,false);
  }

  showemailpopup() {
  }
}
