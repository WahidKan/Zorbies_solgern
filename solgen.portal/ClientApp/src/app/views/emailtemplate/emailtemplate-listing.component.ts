import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailTemplateService, EmailTemplate } from './emailtemplate.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonService, Master, ModuleNames, ModuleList } from '../shared/common.service';
import { concat } from 'rxjs/operators';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-emailtemplate-listing',
  templateUrl: './emailtemplate-listing.component.html',
  styleUrls: ['./emailtemplate-listing.component.scss']
})
export class EmailtemplateListingComponent implements OnInit {
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  emailTemplate: EmailTemplate[];
  //modulePermission: ModuleList;
  id = "";
  loading = false;
  sortDir = 'asc';
  sortColumn = 'EmailTemplateName';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';

  lstPageSize: any
  pageSizeValue: number;
  loginuserid: any;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  loadSave: boolean = false;
  currentPage: number;
  contentHeader: object;
  userTypeName:any;
  constructor(private router: Router,
    private emailTemplateService: EmailTemplateService,
    private dialogService: ConfirmationDialogService,
    private toaster: ToastrService,
    private commonService: CommonService,
    private activeRoute: ActivatedRoute) {
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);



    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'EMAILTEMPLATEADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'EMAILTEMPLATEUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'EMAILTEMPLATEDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });

  }
  
  ngOnInit() {
    this.loading = true;
    ;
    this.userTypeName = JSON.parse(localStorage.getItem('userinfo'))["userTypeName"].replace(/\s/g, '').toLowerCase();
    // this.companyType = this.userInfo["companyType"];
    // this.userTypeName = this.userInfo["userTypeName"];
    this.currentPage = 0;
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
  
 this.initBreadCrumb();
 }
 
 initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Email Templates',
       actionButton: true,
       iconCssClass: '',
       breadcrumb:
         [
           {
             name: 'Dashboard',
             isLink: true,
             link: '/super-admin-dashboard'
           },
           {
             name: 'Email Templates',
             isLink: false
           }
 
         ]
     };
   }

  updateFilter(event) {
    this.currentPage = 0;
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  onChange($event) {
    this.loading = true;
    this.emailTemplateService.getEmailTemplatesList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.emailTemplateService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }


  search() {
    this.loading = true;
    this.emailTemplateService.getEmailTemplatesList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.emailTemplateService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  reset() {
    this.table.sorts = [];
    this.loading = true;
    this.listFilter = '';
    this.sortDir = 'asc';
    this.sortColumn = 'emailTemplateCreatedOn';
    this.pageSizeValue = 10;
    this.emailTemplateService.getEmailTemplatesList(this.listFilter, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(response => {
      this.pagedData = this.emailTemplateService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    var ab = $event.page - 1;
    this.currentPage = ab;
    //this.offset = $event.page;

    this.emailTemplateService.getEmailTemplatesList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.emailTemplateService.pagedData;
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
    this.emailTemplateService.getEmailTemplatesList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.emailTemplateService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  refresh() {
    this.loading = true;
    this.emailTemplateService.getEmailTemplatesList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
;
      this.pagedData = this.emailTemplateService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  deleteEmailTemplate(emailTemplate) {
    const message = `Are you sure you want to delete email template "${emailTemplate.EmailTemplateName}"?`;
    this.dialogService.confirm('Delete Email Template', message).subscribe(confirmed => {
      if (confirmed) {
        this.emailTemplateService.deleteEmailTemplate(emailTemplate.EmailTemplateId).subscribe((response: any) => {
          if (response.responseMessage == "Success") {
            this.toaster.success(`Email Template "${emailTemplate.EmailTemplateName}" has been deleted successfully`);
            this.refresh();
          }
          else {
            this.toaster.error(response.responseMessage);
          }
        }, error => {
         
        });
      }
    });
  }

  disable(email) {
    const message = `Are you sure you want to disable this Email Template "${email.EmailTemplateName}"?`;
    this.dialogService.confirm('Disable Email Template', message).subscribe(confirmed => {
      if (confirmed) {
        this.emailTemplateService.changeStatus(email.EmailTemplateId).subscribe(r => {
          this.refresh();
          this.toaster.success(`"${email.EmailTemplateName}" has been disabled   successfully `);
        }, error => {
        });
      }
    });
  }

  enable(email) {
    const message = `Are you sure you want to enable this Email Template  "${email.EmailTemplateName}"?`;
    this.dialogService.confirm('Enable Email Template', message).subscribe(confirmed => {
      if (confirmed) {
        this.emailTemplateService.changeStatus(email.EmailTemplateId).subscribe(response => {
          this.refresh();
          this.toaster.success(`"${email.EmailTemplateName}" has been enabled  successfully`);
        }, error => {
        });
      }
    });
  }
  
}
