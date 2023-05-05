import { CommonService } from 'src/app/views/shared/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomerAnnouncementService } from '../customer-announcement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-announcement',
  templateUrl: './customer-announcement.component.html',
  styleUrls: ['./customer-announcement.component.scss']
})
export class CustomerAnnouncementComponent implements OnInit {
  form: FormGroup;
  Id: any = 0;
  loadSave: boolean = false;
  contentHeader: object;
  pageTitle: any;
  StatusList: any[] = [
    {
      text: 'Active',
      value: 1001
    },
    {
      text: 'In-Active',
      value: 1002
    }
  ]
  constructor(private service: CustomerAnnouncementService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    private commonService: CommonService) {
    this.form = this.builder.group({
      id: [0],
      title: ['',Validators.required],
      text: ['',Validators.required],
      url: ['',Validators.required],
      description: ['',Validators.required],
      recuringType: [''],
      startDate: [''],
      endDate: [''],
      userType: [''],
      statusId: [null],
      createdBy: [''],
      createdOn: [''],
      modifiedBy: [''],
      modifiedOn: [''],
      visibleTo:['']
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          //this.loadSave = true;
          this.Id = id;
          this.pageTitle = 'Edit Announcement';
          this.GetCustomerAnnouncementById(this.Id);
        }
        else {
          this.pageTitle = 'Add Announcement';
          //this.loadSave = true;
        }

      }
    );
    this.initBreadCrumb();
  }
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Customer Announcements',
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
            name: 'Customer Announcements',
            isLink: true,
            link: '/customerannouncements'
          },
          {
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
    setTimeout(() => {
      this.loadSave = false;
    }, 1000);
  }
  AddEditCusAnnouncement() {
    debugger;
    if(this.form.valid)
    {
    this.loadSave = true;
    return this.service.AddEditCusAnnouncement(this.Id, this.form.value).
      subscribe(res => {
        debugger;
        console.log(res)
        if (res == 0) {
          this.toaster.success("Customer Announcement has been added successfully.")
          this.loadSave = false;
          this.form.reset();
          this.router.navigateByUrl("/customerannouncements");
        }
        else if (res == 1) {
          debugger;
          this.toaster.success("Customer Announcement has been updated successfully.")
          this.loadSave = false;
          this.form.reset();
          this.router.navigateByUrl("/customerannouncements");
        }
        else {
          this.toaster.error("An unknown error occur.")
        }
      })
    }
    else {
      this.commonService.validateAllFormFields(this.form);
    }
  }
  Cancel() {
     this.router.navigateByUrl("/customerannouncements");
  }
  GetCustomerAnnouncementById(id) {
    debugger;
    this.service.GetCustomerAnnouncementById(id).subscribe((res: any) => { 
       console.log(res);
      if (res) {
        debugger;
        res=JSON.parse(res);
        this.loadSave = false;
        this.pageTitle = 'Edit Announcement';
        this.form.patchValue({
          id: res.id,
          title: res.title,
          text: res.text,
          url: res.url,
          description: res.description,
          recuringType: res.recuringType,
          startDate: res.startDate,
          endDate: res.endDate,
          userType: res.userType,
          statusId: res.statusId,
          createdBy: res.createdBy,
          createdOn: res.createdOn,
          modifiedBy: res.modifiedBy,
          modifiedOn: res.modifiedOn,
          visibleTo:res.visibleTo
        })
      }
    })
  }
  get id() {
    return this.form.get('id');
  }
  get title() {
    return this.form.get('title');
  }
  get text() {
    return this.form.get('text');
  }
  get url() {
    return this.form.get('url');
  }
  get description() {
    return this.form.get('description');
  }
  get recuringType() {
    return this.form.get('recuringType');
  }
  get startDate() {
    return this.form.get('startDate');
  }
  get endDate() {
    return this.form.get('endDate');
  }
  get userType() {
    return this.form.get('userType');
  }
  get statusId() {
    return this.form.get('statusId');
  }
  get createdBy() {
    return this.form.get('createdBy');
  }
  get createdOn() {
    return this.form.get('createdOn');
  }
  get modifiedBy() {
    return this.form.get('modifiedBy');
  }
  get modifiedOn() {
    return this.form.get('modifiedOn');
  }
  get visibleTo(){
    return this.form.get('visibleTo');
  }
}
