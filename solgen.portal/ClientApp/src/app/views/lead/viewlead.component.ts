import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeadlistService, noteModel, emailModel } from './leadlist.service';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ModalDirective } from 'ngx-bootstrap/modal'; 
import { DashboardService } from '../dashboard/dashboard.service';
import { EmailTemplateService } from '../emailtemplate/emailtemplate.service';
import { ConfigurationsettingService } from '../configurationsetting/configurationsetting.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ScriptService } from '../shared/scriptservice.service';
 
@Component({
  selector: 'app-viewlead',
  templateUrl: './viewlead.component.html',
  styleUrls: ['./viewlead.component.scss']
})
export class ViewleadComponent implements OnInit {
  @Input() offset: number;
  @ViewChild('fileuploadddl', { static: false }) fileuploadddl: NgSelectComponent;        
    @ViewChild('fileInput', { static: false }) fileInput;;
  @ViewChild('AddNotes', { static: false }) AddNotesModal: ModalDirective;

  @ViewChild('product', { static: false }) productModal: ModalDirective;
  @ViewChild('email', { static: false }) emailModal: ModalDirective;
  @ViewChild('emaildetail', { static: false }) emaildetail: ModalDirective;
  @ViewChild('notedetail', { static: false }) notedetail: ModalDirective;
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  @ViewChild("myckeditor", { static: false }) ckeditor: any;
  @Output('Onsaved') hideEvent: EventEmitter<any> = new EventEmitter();
  leadid: any;  
 // loadSave: boolean = false;
  submoduleid: number = 10;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  notemodel: noteModel = new noteModel();
  emailmodel: emailModel = new emailModel();
  objectname: any = 'lead'; 
  is_converted: boolean = false;
  mobileno: any;  
  emaildata: any;    
  leadstatus: any;
  createdby: string;
  createdon: any;
  location: any;
  appointments: any;
  appointlistbefore: any;
  appointlistafter: any;
  leadName: any;
  listFilter = '';
  searchTxt = '';
  loginuserid: any;
  lstPageSize: any;
  lstPageSizeContact: any;
  lstPageSizeAssociateProduct: any;
  lstPageSizeNotes: any;
  lstPageSizeemail: any;
  usersList: any;
  pageSizeValue: number;
  pageSizeValueContact: number;
  pageSizeValueAssociateProduct: number;
  pageSizeValuenotes: number;
  pageSizeValueemail: number;
  fileuplist: any;
  emaildesc: any;
  templatelist: any;
  contactlist: any;
  notedesc: any;
  tempid: any;
  statusdll: boolean = false;
  createddll: boolean = false;
  sortDir = 'desc';
  sortColumn = 'createdon';
  currentPage: number;
  loading = false;
  pagedData: any = {
    pager: {},
    data: []
  };

  AssociatedproductpagedData: any = {
    pager: {},
    data: []
  };
  NotespagedData: any = {
    pager: {},
    data: []
  };
  emailpagedData: any = {
    pager: {},
    data: []
  };
  productid = "";
  selected = [];
  fileName = 'Choose file';
  fileImageName: any;
  contactpagedData: any = {
    pager: {},
    data: []
  };
  statusid: any;
  leadSource: any;
  emailfilter: any;
  lstleadstatus: any;
  lstfiletype: any;
  lstColorCode: any;
  companyid: number;
  isloanapp: boolean = false;
  isopportuinity: boolean = false;
  createdcode: boolean = false;
  loadSave: boolean = false;
  fileExtension: any;
  ckeConfig;
  displayCheck;
  contentHeader: object;

  constructor(private route: ActivatedRoute,
    private dialogService: ConfirmationDialogService,
    private configurationsettingService: ConfigurationsettingService,
    private dashboardService: DashboardService,
    private emailTemplateService: EmailTemplateService,
    private commonService: CommonService,
    private leadservice: LeadlistService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService, private dynamicScripts: ScriptService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

  }

  ngOnInit() {

    this.dynamicScripts.load('map');

    this.getconverttype();  
   // this.loadSave = false;
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.leadid = id;
        // // console.log('leadid', this.leadid);
      })
    this.loadSave = false;
    this.pageSizeValue = 10;
    this.pageSizeValueContact = 10;
    this.pageSizeValueAssociateProduct = 10;
    this.pageSizeValueemail = 10;
    this.pageSizeValuenotes = 10;
    this.currentPage = 0;
    this.getPageSizes();

    this.GetLeadappointments();
    this.GetLeadAccountdata();

    this.GetAssociateProductList();
    this.getNoteslist();
    this.getEmaillist();
    this.getContactList();
    this.getImages();
    this.getcontactdll();
    this.GettemplatetDll();
    this.getUsers();
   

    this.commonService.getMasterItemsList('leadstatus').subscribe((result: any) => {
      this.lstleadstatus = this.commonService.masters;
      // // console.log('leadstats', this.lstleadstatus);
    })
    this.commonService.getMasterItemsList('PrerequisiteLoanProductDocumentType').subscribe((result: any) => {
      this.lstfiletype = this.commonService.masters;
      // console.log('lstfiletype', this.lstfiletype);
    })
  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Leads',
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
             name: 'Manage Leads',
             isLink: true,
             link: '/lead'
           },
           {
             name: 'Lead Details',
             isLink: false
           }
  
         ]
     };
   }
   
  GetColorCode(fieldValue: any) {
    this.lstColorCode = fieldValue.split("::");
  }
 
  GetLeadAccountdata() {
    this.leadservice.GetLeadAccountdata(this.leadid, this.submoduleid, this.objectname).subscribe((result: any) => {
      // // console.log('result', result);
      this.createdon = result[0].CreatedDate;
      this.emaildata = result[0].Email;
      this.mobileno = result[0].MobilePhone;
      this.leadstatus = result[0].StatusName;
      this.location = result[0].address;
      this.createdby = result[0].createdby;
      this.leadName = result[0].leadName; 
      this.leadSource = result[0].leadsource; 
      this.is_converted = result[0].is_Converted;
      //alert((this.createdby.toLowerCase() == "system ") + this.createdby);
      if (result[0].createdby.toLowerCase() == 'system ') {
      
        this.createdcode = true;     
      }
      // // console.log('result', result);
      // console.log('this.is_converted ', this.createdby);
      this.leadform.patchValue({
        leadstatusddl: result[0].statusddl
       
      })

         
    })
  }
  isSystem(data: any): boolean {
    if (data.toLowerCase() === 'system') {
      return true;
    }
    return false;
  }
  GetLeadappointments() {
    this.leadservice.GetLeadappointments(this.leadid, this.submoduleid, this.objectname).subscribe((result: any) => {



      // // console.log('appointlistbefore', result);
      this.appointlistbefore = result.filter(x => x.AppointmentType == 'upcoming');
      this.appointlistafter = result.filter(x => x.AppointmentType == 'past');



    })
  }
  deleteAssociateproduct(Id: any, ) {
    const message = `Are you sure you want to de-Associate Product?`;
    this.dialogService.confirm('Delete Product', message).subscribe(confirmed => {
      if (confirmed) {

        this.leadservice.deleteAssociateproduct(Id, this.leadid, this.submoduleid, this.objectname).subscribe(r => {
          this.toaster.success(`Product has been de-Associate successfully..`);     

          this.GetAssociateProductList();
        }, error => {
        });
      }
    });

  }
  GetProductList() {
    this.productModal.show();
    this.leadservice.GetProductList(this.leadid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.leadservice.pagedData;

      // // console.log('pagedData', this.pagedData);

    })
  }

  GetAssociateProductList() {

    this.leadservice.GetAssociateProductList(this.leadid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.leadservice.pagedData;
      // // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);

    })
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
      this.lstPageSizeContact = this.commonService.masters;
      this.lstPageSizeNotes = this.commonService.masters;
      this.lstPageSizeemail = this.commonService.masters;
      this.lstPageSizeAssociateProduct = this.commonService.masters;
    })
  }

  onActivate(event) {
  }
  onSelect({ selected }) {
    if (this.productid == "" || this.productid == null || this.productid == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].asociatedUser !== 1) {
          this.productid += selected[i].ID.toString() + ",";
        }
      }

    }
    else {
      this.productid = null;
      this.productid = "";
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].asociatedUser !== 1) {
          this.productid += selected[i].ID.toString() + ",";
        }
      }
    }
    // // console.log('this.productid', this.productid);
  }
  setPageAssociateProduct($event) {
    this.leadservice.GetAssociateProductList(this.leadid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, this.lstPageSizeAssociateProduct, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.leadservice.pagedData;
      // // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);

    })

  }

  setPage($event) {
    this.lstPageSize = $event.page - 1;

    this.leadservice.GetProductList(this.leadid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, this.lstPageSize, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.leadservice.pagedData;
      // // console.log('pagedData', this.pagedData);

    })
  }
 
  setPageNote($event) {
    this.loading = true;
    this.currentPage = $event.page;
    this.getNoteslist();
  }
  saveProduct() {
    
    if (this.selected.length > 0) {
      this.loadSave = true;
      // // console.log('this.productid1111', this.productid);
          

      this.leadservice.AssociteProduct(this.selected.map(m => m.ID).join(), this.leadid, this.submoduleid, this.objectname, this.isloanapp).subscribe(r => {
              // // console.log('produvct')
              this.toaster.success(`product has been Associate scuccessfully`);
              this.loadSave = false;
              this.productid = "";
              this.selected = [];
              this.GetAssociateProductList();
              this.GetProductList();
              this.productModal.hide();
            }, error => {
            })
       
    }

    else {
      this.loadSave = false
      this.toaster.error("Please select at least one row.");
    }
    this.loadSave = false

  }
  showNotesPopup() {
    this.AddNotesModal.show();
  }


  SaveNotes() {
    if (this.addNoteForm.valid) {
      this.loadSave = true;
     // this.notemodel.note_name = this.addNoteForm.value.note;
      this.notemodel.note_description = this.addNoteForm.value.noteDescription;
      this.notemodel.object_ref_id = this.leadid;
      this.notemodel.object_name = this.objectname
      this.notemodel.object_id = this.submoduleid;
      this.notemodel.isPrivate = this.addNoteForm.value.isPrivate;
      // // console.log(this.addNoteForm.value.note + ' sadf' + this.addNoteForm.value.noteDescription);

      this.leadservice.saveNotes(this.notemodel).subscribe((result: any) => {

        if (result.statusCode == 200) {
          //setTimeout(() => {  // console.log('notes') }, 3000);
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addNoteForm.reset();
          this.getNoteslist();
          this.addNoteForm.patchValue({
            isPrivate: '1'
          })
          this.AddNotesModal.hide();


        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }

        //}, error => {
        //  //this.loadSave = false;
      });  
    }
    else {
      this.loadSave = false;
      this.commonService.validateAllFormFields(this.addNoteForm);
    }
  }
  clickrm() {
    this.AddNotesModal.show();
  }

  getEmaillist() {

    this.leadservice.getEmaillist(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      
      this.emailpagedData = this.leadservice.pagedData;
      // // console.log('emailpagedData', this.emailpagedData);

    })
  }

  getNoteslist() {

    this.leadservice.getNoteslist(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.NotespagedData = this.leadservice.pagedData;
      this.offset = this.currentPage;
    })
  }
  DeleteNote(Id: any) {
    const message = `Are you sure you want to delete Note?`;
    this.dialogService.confirm('Delete Note', message).subscribe(confirmed => {
      if (confirmed) {

        this.leadservice.DeleteNote(Id, this.leadid, this.submoduleid, this.objectname).subscribe(r => {
          this.toaster.success(`Note has been deleted successfully..`);

          this.getNoteslist();
        }, error => {
        });
      }
    });
  }
  DeleteContact(Id: any) {
    const message = `Are you sure you want to delete Note?`;
    this.dialogService.confirm('Delete Note', message).subscribe(confirmed => {
      if (confirmed) {

        this.leadservice.DeleteContact(Id, this.leadid, this.submoduleid, this.objectname).subscribe(r => {
          this.toaster.success(`Note has been deleted successfully..`);

          this.getContactList();
        }, error => {
        });
      }
    });
  }

  setPageNotes($event) {
    this.lstPageSizeNotes = $event.page - 1;
    this.leadservice.getNoteslist(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeNotes, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.NotespagedData = this.leadservice.pagedData;
      // // console.log('NotespagedData', this.NotespagedData);

    })
  }


  addNoteForm = this.fb.group({
   // note: ['', Validators.required],
    noteDescription: ['', Validators.required],
    isPrivate: ['1']

  })
  leadform = this.fb.group({
   // note: ['', Validators.required],
    leadstatusddl: [null, Validators.required],
    createdbyddl: [null, Validators.required],


  })
 

 // get note() { return this.addNoteForm.get('note'); }
  get noteDescription() { return this.addNoteForm.get('noteDescription'); }
  get isPrivate() { return this.addNoteForm.get('isPrivate'); }
  get leadstatusddl() { return this.leadform.get('leadstatusddl'); }
  get createdbyddl() { return this.leadform.get('createdbyddl'); }
  EmailForm = this.fb.group({
    templateid: [null],
    sentto: [null, Validators.required],
    subject: ['', Validators.required],
    emailDescription: ['', Validators.required],


  })  
  get sentto() { return this.EmailForm.get('sentto'); }
  get templateid() { return this.EmailForm.get('templateid'); }
  get subject() { return this.EmailForm.get('subject'); }
  get emailDescription() { return this.EmailForm.get('emailDescription'); }

  updateLeadStatus() {
  
    if (this.leadform.controls.leadstatusddl.valid) {
      this.leadservice.updateLeadStatus(this.leadform.value.leadstatusddl, this.leadid).subscribe((result: any) => {
        this.toaster.success('lead status updated successfully');
        this.statusdll = false;
        this.GetLeadAccountdata();
      })
    }
    else {
      this.commonService.validateAllFormFields(this.leadform);
    }

  }
     
  SaveEmail() {
    // console.log('temp',this.EmailForm.value.templateid);
    
    if (this.EmailForm.value.templateid == null) {
      this.EmailForm.value.templateid=0;
    }
      if (this.EmailForm.valid) {
      this.loadSave = true;
      
      var ab = this.contactlist.filter(x => x.value == this.EmailForm.value.sentto);
      this.emailmodel.sent_to = ab[0].masterName;

      this.emailmodel.contactid = this.EmailForm.value.sentto;
      this.emailmodel.templateid = this.EmailForm.value.templateid;
      this.emailmodel.subject = this.EmailForm.value.subject;
      this.emailmodel.description = this.EmailForm.value.emailDescription;
      this.emailmodel.object_ref_id = this.leadid;
      this.emailmodel.object_name = this.objectname
      this.emailmodel.object_id = this.submoduleid;
      //this.emailmodel.EmailForModule = this.objectname;

      // // console.log(this.emailmodel)
      this.leadservice.saveEmail(this.emailmodel).subscribe((result: any) => {
        setTimeout(() => {
          if (result.statusCode == 200) {
            this.loadSave = false;
            this.toaster.success(result.responseMessage);
            this.getEmaillist();  
            this.emailModal.hide();
            this.EmailForm.reset();

          }

          else {
            this.loadSave = false;
            this.toaster.error(result.responseMessage);
          }
        }, 3000);


      });
    }
    else {
      this.commonService.validateAllFormFields(this.EmailForm);
    }

  }


  AddContact() {

    this.router.navigate(['../contactlist/addContact', this.leadid]);
  }

  //IMAGE UPLOAD   

  UploadimageForm = this.fb.group({
    profilePic: [''],
    'file': '',
    'filename': [''],
    filetype: [null, Validators.nullValidator]
  });
  get profilePic() { return this.UploadimageForm.get('profilePic'); }
  get filename() { return this.UploadimageForm.get('filename'); }
  get filetype() { return this.UploadimageForm.get('filetype'); }


  setFile($event): void {

    this.commonService.uploadImageFileValidator($event);
    this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB")
    if (this.commonService.isFileValid) {
      this.fileName = $event.target.files[0].name;
      this.fileExtension = this.fileName.replace(/^.*\./, '');
     
      //this.companyLogo.setValue($event.target.files[0].name);

    }
  }

  private prepareFormDataForDocument() {

    const input = new FormData();
    input.append('companyId', '1001');
    input.append('companyName', '');
    input.append('moduleid', 'lead');
    input.append('submoduleid', '10');
    input.append('refid', this.leadid);
    input.append('filetype', this.UploadimageForm.value.filetype);
    input.append('fileExtension', this.fileExtension);

    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      input.append('file', fileBrowser.files[0]);
    }
    return input;
  }

  SaveImage() {
    
    if (this.UploadimageForm.valid) {
      this.loadSave = true;
     
    const companySetupModel = this.prepareFormDataForDocument();
    this.dashboardService.addOrUpdateUploadFileOnAzzure(companySetupModel).subscribe((result: any) => {
      setTimeout(() => {
        if (result.statusCode == 200) {
          this.loadSave = false;
          this.toaster.success('image uploaded successfully');

          this.fileInput.nativeElement.value = "";
          //// // console.log("fileInput", this.fileInput.nativeElement.files);

          this.fileName = '';
         this.UploadimageForm.reset();
          this.getImages();
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, 3000);
    }, error => {

    });
    }
    else {
      this.loadSave = false;
      this.commonService.validateAllFormFields(this.UploadimageForm);   
    }

  }

  getContactList() {
    this.leadservice.getContactList(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.contactpagedData = this.leadservice.pagedData;
      // // console.log('contactpagedData', this.contactpagedData);

    })
  }

  showemailpopup() {
    this.emailModal.show()
  }
  close() {
    this.emailModal.hide();
    this.AddNotesModal.hide();
    this.productModal.hide();
  }
  onChange($event) {
    this.leadservice.GetProductList(this.leadid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.leadservice.pagedData;

      // // console.log('pagedData', this.pagedData);

    })
  }
  onChangeEmail($event) {
    this.leadservice.getEmaillist(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.emailpagedData = this.leadservice.pagedData;
      // // console.log('emailpagedData', this.emailpagedData);

    })
  }
  onChangeNotes($event) {
    this.leadservice.getNoteslist(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.NotespagedData = this.leadservice.pagedData;
       // console.log('NotespagedData', this.NotespagedData);

    })
  }
  onChangeAssociateProduct($event) {
    this.leadservice.GetAssociateProductList(this.leadid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.AssociatedproductpagedData = this.leadservice.pagedData;
      // // console.log('AssociatedproductpagedData', this.AssociatedproductpagedData);

    })
  }
  setPageContact($event) {
    this.leadservice.getContactList(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeContact, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.contactpagedData = this.leadservice.pagedData;
      // // console.log('contactpagedData', this.contactpagedData);

    })

  }
  onChangeContact() {
    this.leadservice.getContactList(this.leadid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.contactpagedData = this.leadservice.pagedData;
      // // console.log('contactpagedData', this.contactpagedData);

    })
  }   
  getImages() {
    this.leadservice.getImages(this.leadid, this.submoduleid).subscribe((result: any) => {
      this.fileuplist = result;
      // // console.log('fileuplist', result);
    })
  }
  displayemaildetail(data: any) {

    this.emaildesc = data.description;
    // // console.log('sasd', this.emaildesc);
    this.emaildetail.show();
  }
  closeemaildesc() {
    this.emaildetail.hide();
  }
  displaynotedetail(data: any) {
    this.notedesc = data.note_description;
    // // console.log('notedesc', this.notedesc);
    this.notedetail.show();
  }
  closenotedesc() {
    this.notedetail.hide();
  }
  onChangetemp($event: any): void {
  }

  onPaste($event: any): void {
  }
  getcontactdll() {
    this.leadservice.GetContactDll(this.leadid, this.submoduleid, this.objectname).subscribe((result: any) => {
      this.contactlist = result;
      // // console.log(' this.contactlist', this.contactlist);
    })
  }
  GettemplatetDll() {
    this.leadservice.GettemplatetDll(this.objectname).subscribe((result: any) => {
      this.templatelist = result;
    })
  }
  gettemplatelist(event: any) {
    // // console.log('event', event);
    this.tempid = event.value;
    this.emailTemplateService.getEmailTemplateById(this.tempid).subscribe((result: any) => {
      // // console.log('tempaltedate', result)

      this.EmailForm.patchValue({
        subject: result.emailTemplateSubject,
        emailDescription: result.template
      })
    })
  }


  getconverttype() {
    this.configurationsettingService.GetLeadConfigurationDetails(this.companyid).subscribe((leadresult: any) => {

      this.isloanapp = leadresult.isLoanapplication;
      this.isopportuinity = leadresult.isOpportunity;
      // // console.log('leadresult', leadresult);
      // // console.log('isopportuinity', this.isopportuinity);
      // // console.log('isloanapp', this.isloanapp);
    })
  }
  updateStatusdllopn() {
    this.statusdll = true;
  }
  Deleteimage(Id: any) {

    const message = `Are you sure you want to delete Image?`;
    this.dialogService.confirm('Delete Image', message).subscribe(confirmed => {
      if (confirmed) {

        this.leadservice.Deleteimage(Id).subscribe(r => {
          this.toaster.success(`Image has been deleted successfully..`);

          this.getImages();
        }, error => {
        });
      }
    });
  }

  get curPage(): number {
    return this.offset;
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 0;
    this.loading = true;
    this.getNoteslist();
  }
  getUsers() {   
    this.commonService.getMasterItemsList("Users").subscribe((res: any) => {
      this.usersList = this.commonService.masters;
      // console.log('this.usersList', this.usersList)
     
    })
  }
  opencreatedby() {
    this.createddll = true;
  }
  updatecreatedBy() {
    this.leadform.value.leadstatusddl='asds'    
   
    if (this.leadform.controls.createdbyddl.valid) {
      this.leadservice.updatecreatedBy(this.leadform.value.createdbyddl, this.leadid).subscribe((result: any) => {
        this.toaster.success('Owner Name updated successfully');
        this.createddll = false;
        this.GetLeadAccountdata();
      })
    }   
    else {
      this.commonService.validateAllFormFields(this.leadform);
    }
  }
  
}     


