import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpportunityListService, appointmentmodelopp, RequestDesign } from './opportunitylist.service';
import { CommonModule } from '@angular/common';
import { CommonService } from '../shared/common.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';     
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { window } from 'rxjs/operators';
import { LeadlistService, noteModel, emailModel } from '../lead/leadlist.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { EmailTemplateService } from '../emailtemplate/emailtemplate.service';


@Component({
  selector: 'app-opportunityview',
  templateUrl: './opportunityview.component.html',
  styleUrls: ['./opportunityview.component.scss']
})
export class OpportunityviewComponent implements OnInit {
  @ViewChild('fileuploadddl', { static: false }) fileuploadddl: NgSelectComponent;
  @ViewChild('makeappointment', { static: false }) modalmakeAppointment: ModalDirective;
  @ViewChild('requestdesign', { static: false }) requestdesignModal: ModalDirective;
    @ViewChild('fileInput', { static: false }) fileInput;
  @ViewChild('AddNotes', { static: false }) AddNotesModal: ModalDirective;
  @ViewChild('product', { static: false }) productModal: ModalDirective;
  @ViewChild('email', { static: false }) emailModal: ModalDirective;
  @ViewChild('emaildetail', { static: false }) emaildetail: ModalDirective;
  @ViewChild('notedetail', { static: false }) notedetail: ModalDirective;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild("myckeditor", { static: false }) ckeditor: any; 
  @ViewChild('clearDrop', { static: false }) clearDrop: NgSelectComponent;
  active = false;
  lstCustomer: any;
  lstappointment: any;
  notemodel: noteModel = new noteModel();
  requestDesign: RequestDesign = new RequestDesign();
  emailmodel: emailModel = new emailModel();
  fTime: Date;
  Tdate: Date;
  utcDate: Date;
  opid: any;
  oplist: any;
  stagelist: any;
  stageid: any = 1;
  tabllist: any;
  Loan_Product: any;
  appointlistbefore: any;
  apoitlistafter: any;
  Aware_of_Solar_Tax_Credits_ITC: any;

  Aware_of_Solar_Tax_Liabilities: any;

  Budget_Confirmed: any;

  Credit_Threshold_Met: any;

  Description: any;
  Discovery_Completed: any;

  Homeowner: any;

  Insulation_Upgrade: any;

  LED_Lightbulb_Upgrade: any;
  Loss_Reason: any;

  Max_R_Upgrade: any;

  Mounting_Location: any;

  OpportunityName: any;

  Probability: any;

  ROI_Analysis_Completed: any;

  Re_Roof_Needed: any;

  Request_Proposal_Design: any;

  Roof_Material: any;

  Roof_Type: any;

  Shop_has_Electrical_Sub_Panel: any;

  Smart_Thermostat_Installation: any;

  closeddate: any;

  leadsource: any;

  mainpannelupgrade: any;

  primarycampsourc: any;

  syncquate: any;

  worklist: any;
  proposallist: any;
  tasklist: any;
  productlist: any;
  accountdata: any;

  Address: any;

  closeddate1: any;

  createdon: any;

  emailacc: any;

  phoneno: any;

  status: any;

  workorder: any;

  workorderDate: any;
  fileuplist: any;
  appointlistafter: any;
  contractlist: any;
  submoduleid: 11;
  objectname:'opportunity'
  //new
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  leadName: any;
  listFilter = '';
  searchTxt = '';
  loginuserid: any;
  lstPageSize: any;
  lstPageSizeContact: any;
  lstPageSizeAssociateProduct: any;
  lstPageSizeProposal: any;
  lstPageSizeNotes: any;
  lstPageSizeemail: any;
  pageSizeValue: number;
  pageSizeValueContact: number;
  pageSizeValueAssociateProduct: number;
  pageSizeValueProposal: number;
  pageSizeValuenotes: number;
  pageSizeValueemail: number;
  emaildesc: any;
  templatelist: any;
  contactlist: any;
  notedesc: any;
  tempid: any;

  sortDir = 'desc';
  sortColumn = 'createdon';
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
  AssociatedproposalpagedData: any = {
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
  emailfilter: any;
  substagename: any;
  createdby: any;
  lstfiletype: any;
  loadSave: boolean = false;
  date1: string;

  minimumDate: any;
  minFromTime: any;
  maxToTime: any;
  ckeConfig;
  displayCheck;
  is_converted;
  contentHeader: object;


  constructor(private route: ActivatedRoute,
    private commonService: CommonService,
    private opprtunityservice: OpportunityListService,
    private fb: FormBuilder,
    private emailTemplateService: EmailTemplateService,
    private dashboardService: DashboardService,
    private dialogService: ConfirmationDialogService,
    private leadservice: LeadlistService,   
    private router: Router,
    private toaster: ToastrService) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
    });
  }

  ngOnInit() {
    this.submoduleid= 11;
    this.objectname = 'opportunity';
    localStorage.removeItem('opid');
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.opid = id;
        localStorage.setItem('opid', this.opid);
      })
 
    this.getopportunitystage();
   
    this.GetOpportunityViewAccData();
    this.Getappointments();
    this.pageSizeValue = 10;
    this.pageSizeValueContact = 10;
    this.pageSizeValueAssociateProduct = 10;
    this.pageSizeValueProposal = 10;
    this.pageSizeValueemail = 10;
    this.pageSizeValuenotes = 10;
    this.getPageSizes();
    this.GetAssociateProductList();
 //  this.GetOpportunityProposalList();
    this.getNoteslist();
    this.getEmaillist();
    this.getContactList();
    this.getImages();
    this.getcontactdll();
    this.GettemplatetDll();
    this.commonService.getMasterItemsList('PrerequisiteLoanProductDocumentType').subscribe((result: any) => {
      this.lstfiletype = this.commonService.masters;
      // // console.log('lstfiletype', this.lstfiletype);
    })
 
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Opportunity',
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
             name: 'Manage Opportunity',
             isLink: true,
             link: '/opportunity'
           },
           {
             name: 'Opportunity Details',
             isLink: false
           }
  
         ]
     };
   } 
  changeToValue(e) {

  }

  getopportunitystage() {
    this.opprtunityservice.getopportunitystage(this.opid).subscribe((result: any) => {
      this.stagelist = result;
      // // console.log('stagelist', this.stagelist);
       
      for (var i = 0; i < result.length; i++) { //12 change due yo error by aakash goyal
        if (result[i].activeTab == 1) {
          this.stageid = result[i].stageid;
        }


        // // console.log(this.stageid);
          this.GetOpportunityview();
       
      }
      
     
    })
  }
  tabclick(id: any) {
    this.stageid = id;
    this.GetOpportunityview();
  }

  editProposal(id: any,oppId:any) {
    this.router.navigate(['../proposal-list/addproposal/opportunity/', oppId], { queryParams: { proposal: id } });
  }

  GetOpportunityViewAccData() {
    this.opprtunityservice.GetOpportunityViewAccData(this.opid).subscribe((result: any) => {
      // // console.log('this.accountdata',result);
      if (result.length > 0) {
        this.accountdata = result;

        this.emailacc = result[0].Email;
        this.Address = result[0].Address;

        this.closeddate1 = result[0].closeddate;

        this.createdon = result[0].createdon;

        this.phoneno = result[0].MobilePhone;
        this.createdby = result[0].createdby;
        this.substagename = result[0].subStageName;
      }

      
      // // console.log('this.emailacc', this.emailacc);
    })
  }
  DeleteContact(Id: any) {
    const message = `Are you sure you want to delete Contact?`;
    this.dialogService.confirm('Delete Note', message).subscribe(confirmed => {
      if (confirmed) {

        this.leadservice.DeleteContact(Id, this.opid, this.submoduleid, this.objectname).subscribe(r => {
          this.toaster.success(`Contact has been deleted successfully..`);

          this.getContactList();  
        }, error => {
        });
      }
    });
  }

  GetOpportunityview() {
    this.opprtunityservice.GetOpportunityview(this.opid, this.stageid).subscribe((result: any) => {
      this.oplist = result;
      // // console.log('oplist', result);
    })
  }
  updateStage(id: any) {
    const message = `Are you sure you want update Stage?`;
    this.dialogService.confirm('update Stage', message).subscribe(confirmed => {
      if (confirmed) {
        this.opprtunityservice.updateStage(this.opid, id).subscribe((result: any) => {
          this.GetOpportunityview();
          this.getopportunitystage();

          this.GetOpportunityViewAccData();     
        }, error => {
        });
      }
    });    
  }
  Getappointments() {
    this.leadservice.GetLeadappointments(this.opid, this.submoduleid, this.objectname).subscribe((result: any) => {
      // // console.log('appointlistbefore', result);
      this.appointlistbefore = result.filter(x => x.AppointmentType == 'upcoming');
      this.appointlistafter = result.filter(x => x.AppointmentType == 'past');
    })
  }
  
  deleteAssociateproduct(Id: any, ) {
    const message = `Are you sure you want to de-Associate Product?`;
    this.dialogService.confirm('Delete Product', message).subscribe(confirmed => {
      if (confirmed) {

        this.leadservice.deleteAssociateproduct(Id, this.opid, this.submoduleid, this.objectname).subscribe(r => {
          this.toaster.success(`Product has been de-Associate successfully..`);

          this.GetAssociateProductList();
        }, error => {
        });
      }
    });
  }
  deleteAssociateProposal(Id: any) {
    const message = `Are you sure you want to proposal?`;
    this.dialogService.confirm('Delete Proposal', message).subscribe(confirmed => {
      if (confirmed) {
        this.opprtunityservice.DeleteRecords(Id, 'tblProposal').subscribe(r => {
          this.toaster.success(`Proposal has been delete successfully..`);
          this.GetOpportunityProposalList();
        }, error => {
        });
      }
    });
  }


  GetProductList() {
    this.productModal.show();
    this.leadservice.GetProductList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.pagedData = this.leadservice.pagedData;
      // // console.log('pagedData', this.pagedData);
    })
  }

  GetAssociateProductList() {
    this.leadservice.GetAssociateProductList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.AssociatedproductpagedData = this.leadservice.pagedData;
    })
  }

  GetOpportunityProposalList() {
    this.opprtunityservice.GetOpportunityProposalList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.AssociatedproposalpagedData = this.opprtunityservice.pagedData;
    })
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
      this.lstPageSizeContact = this.commonService.masters;
      this.lstPageSizeNotes = this.commonService.masters;
      this.lstPageSizeemail = this.commonService.masters;
      this.lstPageSizeAssociateProduct = this.commonService.masters;
      this.lstPageSizeProposal = this.commonService.masters;
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
    this.leadservice.GetAssociateProductList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, this.lstPageSizeAssociateProduct, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.AssociatedproductpagedData = this.leadservice.pagedData;
    })
  }
  setPageAssociateProposal($event) {
    this.opprtunityservice.GetOpportunityProposalList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, this.lstPageSizeAssociateProduct, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.AssociatedproposalpagedData = this.opprtunityservice.pagedData;
    })
  }

  setPage($event) {
    this.lstPageSize = $event.page - 1;

    this.leadservice.GetProductList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, this.lstPageSize, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.leadservice.pagedData;
      // // console.log('pagedData', this.pagedData);

    })
  }
  setPageNote($event) {
    this.leadservice.getNoteslist(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeemail, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.NotespagedData = this.leadservice.pagedData;
      // // console.log('NotespagedData', this.NotespagedData);

    })
  }
  saveProduct() {
      
    if (this.productid != null && this.productid != "") {
      //this.loadSave = false;
      // // console.log('this.productid1111', this.productid);
      

      this.leadservice.AssociteProduct(this.productid, this.opid, this.submoduleid, this.objectname, false).subscribe(r => {
        // // console.log('produvct')
        this.toaster.success(`product has been Associate scuccessfully`);
        // this.loadSave = true
        this.productid = "";
        this.selected = [];
        this.GetAssociateProductList();
        this.GetProductList();
        this.productModal.hide();
      }, error => {
      });
    
    }

    else {
      // this.loadSave = true
      this.toaster.error("Please select at least one row.");
    }
    //this.loadSave = true

  }
  showNotesPopup() {
    this.AddNotesModal.show();
  }
  SaveNotes() {
    if (this.addNoteForm.valid) {
      this.loadSave = true;
     // this.notemodel.note_name = this.addNoteForm.value.note;
      this.notemodel.note_description = this.addNoteForm.value.noteDescription;
      this.notemodel.object_ref_id = this.opid;
      this.notemodel.object_name = this.objectname
      this.notemodel.object_id = this.submoduleid;
      // // console.log(this.addNoteForm.value.note + ' sadf' + this.addNoteForm.value.noteDescription);

      this.leadservice.saveNotes(this.notemodel).subscribe((result: any) => {

        if (result.statusCode == 200) {
          //setTimeout(() => {  // console.log('notes') }, 3000);
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addNoteForm.reset();
          this.getNoteslist();

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

    this.leadservice.getEmaillist(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.emailpagedData = this.leadservice.pagedData;
      // // console.log('emailpagedData', this.emailpagedData);

    })
  }

  getNoteslist() {

    this.leadservice.getNoteslist(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.NotespagedData = this.leadservice.pagedData;
      // // console.log('NotespagedData', this.NotespagedData);

    })
  }
  DeleteNote(Id: any) {
    const message = `Are you sure you want to delete Note?`;
    this.dialogService.confirm('Delete Note', message).subscribe(confirmed => {
      if (confirmed) {

        this.leadservice.DeleteNote(Id, this.opid, this.submoduleid, this.objectname).subscribe(r => {
          this.toaster.success(`Note has been deleted successfully..`);

          this.getNoteslist();
        }, error => {
        });
      }
    });
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

  setPageNotes($event) {
    this.lstPageSizeNotes = $event.page - 1;
    this.leadservice.getNoteslist(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeNotes, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.NotespagedData = this.leadservice.pagedData;
      // // console.log('NotespagedData', this.NotespagedData);

    })
  }


  addNoteForm = this.fb.group({
   // note: ['', Validators.required],  
    noteDescription: ['', Validators.required],


  })

  //get note() { return this.addNoteForm.get('note'); }
  get noteDescription() { return this.addNoteForm.get('noteDescription'); }
  EmailForm = this.fb.group({
    templateid: [null, Validators.required],
    sentto: [null, Validators.required],
    subject: ['', Validators.required],
    emailDescription: ['', Validators.required],


  })
  get sentto() { return this.EmailForm.get('sentto'); }
  get templateid() { return this.EmailForm.get('templateid'); }
  get subject() { return this.EmailForm.get('subject'); }
  get emailDescription() { return this.EmailForm.get('emailDescription'); }



  SaveEmail() {
    if (this.EmailForm.valid) {
      this.loadSave = true;
      var ab = this.contactlist.filter(x => x.value == this.EmailForm.value.sentto);
      this.emailmodel.sent_to = ab[0].masterName;

      this.emailmodel.contactid = this.EmailForm.value.sentto;
      this.emailmodel.templateid = this.EmailForm.value.templateid;
      this.emailmodel.subject = this.EmailForm.value.subject;
      this.emailmodel.description = this.EmailForm.value.emailDescription;
      this.emailmodel.object_ref_id = this.opid;
      this.emailmodel.object_name = this.objectname
      this.emailmodel.object_id = this.submoduleid;

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
      this.loadSave = false;
      this.commonService.validateAllFormFields(this.EmailForm);
    }

  }


  AddContact() {

    this.router.navigate(['../contactlist/addContact/opportunity', this.opid]);
  }

  //IMAGE UPLOAD   

  UploadimageForm = this.fb.group({
    profilePic: [''],
    'file': '',
    'filename': [''],
    filetype: [null, Validators.required]
  });
  get profilePic() { return this.UploadimageForm.get('profilePic'); }
  get filename() { return this.UploadimageForm.get('filename'); }
  get filetype() { return this.UploadimageForm.get('filetype'); }


  setFile($event): void {

    this.commonService.uploadImageFileValidator($event);
    this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB")
    if (this.commonService.isFileValid) {
      this.fileName = $event.target.files[0].name;
      //this.companyLogo.setValue($event.target.files[0].name);

    }
  }

  private prepareFormDataForDocument() {

    const input = new FormData();
    input.append('companyId', '1001');
    input.append('companyName', '');
    input.append('moduleid', '4');
    input.append('submoduleid', 'opportunity');
    input.append('refid', this.opid);
    input.append('filetype', this.UploadimageForm.value.filetype);

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
          
      

          this.getImages();
          this.fileuploadddl.clearModel();
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
    this.leadservice.getContactList(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
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
    this.leadservice.GetProductList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.pagedData = this.leadservice.pagedData;

      // // console.log('pagedData', this.pagedData);

    })
  }
  onChangeEmail($event) {
    this.leadservice.getEmaillist(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.emailpagedData = this.leadservice.pagedData;
      // // console.log('emailpagedData', this.emailpagedData);

    })
  }
  onChangeNotes($event) {
    this.leadservice.getNoteslist(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {

      this.NotespagedData = this.leadservice.pagedData;
      // // console.log('NotespagedData', this.NotespagedData);

    })
  }
  onChangeAssociateProduct($event) {
    this.leadservice.GetAssociateProductList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.AssociatedproductpagedData = this.leadservice.pagedData;
    })
  }
  onChangeAssociateProposal($event) {
    this.opprtunityservice.GetOpportunityProposalList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.AssociatedproposalpagedData = this.opprtunityservice.pagedData;
    })
  }
  setPageContact($event) {
    this.leadservice.getContactList(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeContact, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.contactpagedData = this.leadservice.pagedData;
      // // console.log('contactpagedData', this.contactpagedData);

    })

  }
  onChangeContact() {
    this.leadservice.getContactList(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(response => {
      this.contactpagedData = this.leadservice.pagedData;
      // // console.log('contactpagedData', this.contactpagedData);

    })
  }
  getImages() {
    this.opprtunityservice.GetOpportunityViewFileupload(this.opid).subscribe((result: any) => {
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
    this.leadservice.GetContactDll(this.opid, this.submoduleid, this.objectname).subscribe((result: any) => {
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
  closerequestdesign() {
    this.requestdesignModal.hide();
  }
  showrequestdesignpopup() {
    this.addRequestDesignForm.reset();
    this.requestdesignModal.show();
    this.GetRequestDesignOpportunity();
    //let today = new Date();
    //this.date1 = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
    //// console.log('date1',this.date1);
    //this.fTime = new Date();
    //this.fTime.getHours() + ":" + this.fTime.getMinutes();
    //this.addRequestDesignForm.patchValue({
    //  requestDate: this.date1,
    //  fromTime:this.fTime
    //})
  }

  GetRequestDesignOpportunity() {
    this.opprtunityservice.GetRequestDesignOpportunity(this.opid).subscribe((result: any)=>{
      // console.log('dataresult', result);
      
      let fromtime = new Date(result.requestDate);
           

      if (result.requestDate != '0001-01-01T00:00:00') {   
        this.addRequestDesignForm.patchValue({
          adderNotes: result.adderNotes,
          designNotes: result.designNotes,
          requestDate: fromtime,
          fromTime: fromtime
        })
      }
      else {
        let today = new Date();
        this.date1 = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        // console.log('date1', this.date1);
        this.fTime = new Date();
        this.fTime.getHours() + ":" + this.fTime.getMinutes();
        this.addRequestDesignForm.patchValue({
          requestDate: this.date1,
          fromTime: this.fTime
        })
      }
    })
  }
  addRequestDesignForm = this.fb.group({
    requestDate: [null, Validators.required],
    fromTime: [null, Validators.required],
    designNotes: [''],
    adderNotes: [''], 
     
  })
  get requestDate() { return this.addRequestDesignForm.get('requestDate'); }
  get fromTime() { return this.addRequestDesignForm.get('fromTime'); }
  get designNotes() { return this.addRequestDesignForm.get('designNotes'); }
  get adderNotes() { return this.addRequestDesignForm.get('adderNotes'); }







  SaveRequestDesign() {
    // console.log('this.addForm', this.addRequestDesignForm.value);
 //requestDesign
    if (this.addRequestDesignForm.valid) {

      this.requestDesign.designNotes = this.addRequestDesignForm.value.designNotes;
      this.requestDesign.adderNotes = this.addRequestDesignForm.value.adderNotes;

      let dtdate = new Date(this.addRequestDesignForm.value.requestDate);
      this.requestDesign.RequestDate = dtdate.toDateString();
 
      this.requestDesign.FromTime = this.addRequestDesignForm.value.fromTime;      
     
      this.fTime = new Date(this.requestDesign.FromTime);
      
      this.requestDesign.FromTime = this.fTime.getHours() + ":" + this.fTime.getMinutes();
      // this.appmodel.ToTime = this.Tdate.getHours() + ":" + this.Tdate.getMinutes();
      this.requestDesign.OpportunityId = this.opid; 
      // console.log('this.appmodel', this.requestDesign);
      
      this.opprtunityservice.SaveRequestDesignOpportunity(this.requestDesign).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
         
       
          this.addRequestDesignForm.reset();
          this.requestdesignModal.hide();

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
      this.commonService.validateAllFormFields(this.addRequestDesignForm);
    }
  }
  onSort(e) {

  }

}

  //GetOpportunityViewFileupload() {
  //  this.opprtunityservice.GetOpportunityViewFileupload(this.opid).subscribe((result: any) => {
  //    this.fileuplist = result;
  //    // // console.log('fileuplist', result);
  //  })
  //}
  //GetOpportunityViewcontractlist() {
  //  this.opprtunityservice.GetOpportunityViewcontractlist(this.opid).subscribe((result: any) => {
  //    this.contractlist = result;
  //    // // console.log('contractlist', result);
  //  })
  //}
  //GetOpportunityViewWorkorder() {
  //  this.opprtunityservice.GetOpportunityViewWorkorder(this.opid).subscribe((result: any) => {
  //    this.worklist = result;
  //    // // console.log('worklist', result);
  //  })
  //}
  //GetOpportunityViewTask() {
  //  this.opprtunityservice.GetOpportunityViewTask(this.opid).subscribe((result: any) => {
  //    this.tasklist = result;
  //    // // console.log('tasklist', result);
  //  })
  //}
//GetAppointmentbyopportunityId() {
//  this.opprtunityservice.GetAppointmentbyopportunityId(this.opid).subscribe((result: any) => {

//    // // console.log('appointlistbefore', result);
//    this.appointlistbefore = result.filter(x => x.AppointmentType == 'upcoming');
//    this.appointlistafter = result.filter(x => x.AppointmentType == 'past');

//  })
//}
  //GetOpportunityViewProposal() {
  //  this.opprtunityservice.GetOpportunityViewProposal(this.opid).subscribe((result: any) => {
  //    this.proposallist = result;

  //    // // console.log('proposallist', result);
  //  })
  //}
  //GetOpportunityViewProduct() {
  //  this.opprtunityservice.GetOpportunityViewProduct(this.opid).subscribe((result: any) => {
  //    this.productlist = result;
  //    // // console.log('productlist', result);
  //  })
  //}
  //GetOpportunityviewTabData() {
  //  this.opprtunityservice.GetOpportunityviewTabData(this.opid).subscribe((result: any) => {
  //    this.tabllist = result;
  //    result.forEach(childObj => {
  //      this.Aware_of_Solar_Tax_Credits_ITC = childObj.Aware_of_Solar_Tax_Credits_ITC;
  //      this.Aware_of_Solar_Tax_Liabilities = childObj.Aware_of_Solar_Tax_Liabilities;

  //      this.Budget_Confirmed = childObj.Budget_Confirmed;
  //      this.Credit_Threshold_Met = childObj.Credit_Threshold_Met;
  //      this.Description = childObj.Description;
  //      this.Loan_Product = childObj.Loan_Product;
  //      this.Discovery_Completed = childObj.Discovery_Completed;
  //      this.Homeowner = childObj.Homeowner;
  //      this.Insulation_Upgrade = childObj.Insulation_Upgrade;
  //      this.LED_Lightbulb_Upgrade = childObj.LED_Lightbulb_Upgrade;
  //      this.Loss_Reason = childObj.Loss_Reason;
  //      this.Max_R_Upgrade = childObj.Max_R_Upgrade;
  //      this.Mounting_Location = childObj.Mounting_Location;
  //      this.OpportunityName = childObj.OpportunityName;
  //      this.Probability = childObj.Probability;
  //      this.ROI_Analysis_Completed = childObj.ROI_Analysis_Completed;
  //      this.Re_Roof_Needed = childObj.Re_Roof_Needed;
  //      this.Request_Proposal_Design = childObj.Request_Proposal_Design;
  //      this.Roof_Material = childObj.Roof_Material;
  //      this.Roof_Type = childObj.Roof_Type;
  //      this.Shop_has_Electrical_Sub_Panel = childObj.Shop_has_Electrical_Sub_Panel;
  //      this.Smart_Thermostat_Installation = childObj.Smart_Thermostat_Installation;
  //      this.closeddate = childObj.closeddate;

  //      this.leadsource = childObj.leadsource;
  //      this.mainpannelupgrade = childObj.mainpannelupgrade;
  //      this.primarycampsourc = childObj.primarycampsourc;
  //      this.syncquate = childObj.syncquate;
  //    })
  //    // // console.log('tablist', result);
  //  })
  //}



  ///appointment Popup
  //getAppointmentType() {
  //  this.commonService.getMasterItemsList('appointmenttype').subscribe((result: any) => {
  //    this.lstappointment = this.commonService.masters;
  //    // // console.log('sas', this.commonService.masters);
  //  })
  //}
  //getcustomertype() {


  //  this.opprtunityservice.GetAssignedUsers().subscribe((result: any) => {

  //    this.lstCustomer = result;

  //  })
  //}
  //close() {
  //  this.active = false;
  //  this.modalmakeAppointment.hide();
  //}
  //Save() {
  //  if (this.addForm.valid) {
  //    this.appmodel.OpportunityId = this.opid;
  //    this.appmodel.AppointmentTypeID = this.addForm.value.appointmenttypeId;
  //    this.appmodel.CustomerID = this.addForm.value.customerId;
  //    this.appmodel.AppointmentDueDate = this.addForm.value.appointmentDueDate;
  //    this.appmodel.FromTime = this.addForm.value.fromTime;
  //    this.appmodel.ToTime = this.addForm.value.toTime;
  //    this.fTime = new Date(this.appmodel.FromTime);
  //    this.Tdate = new Date(this.appmodel.ToTime);
  //    this.appmodel.FromTime = this.fTime.getHours() + ":" + this.fTime.getMinutes();
  //    this.appmodel.ToTime = this.Tdate.getHours() + ":" + this.Tdate.getMinutes();
  //    this.opprtunityservice.addeditannouncement(this.appmodel).subscribe((result: any) => {

  //      if (result.statusCode == 200) {
  //        this.toaster.success(result.responseMessage);
         

  //      }
  //      else {
  //        //this.loadSave = false;
  //        this.toaster.error(result.responseMessage);
  //      }
        
  //    }, error => {
  //      //this.loadSave = false;
  //    });
  //  }
  //  else {
  //    this.commonService.validateAllFormFields(this.addForm);
  //  }

  //  //this.appmodel.FromTime = this.fTime.getDate() + '-' + this.fTime.getMonth() + '-' + this.fTime.getFullYear();
  //  //this.fTime = new Date(this.appmodel.FromTime);


  //  // // console.log(this.appmodel.FromTime);
  //  this.modalmakeAppointment.hide();
  //  this.router.navigateByUrl("/calendar");
  //}
  //show() {
  //  //this.refresh();
  //  this.modalmakeAppointment.show();
  //  this.active = true;
  //}
  //addForm = this.fb.group({
  //  appointmenttypeId: [null],
  //  customerId: [null],
  //  appointmentDueDate: [null],
  //  fromTime: [null],
  //  toTime: [null],

  //  // code: ['', Validators.required],


  //})

  //get appointmenttypeId() { return this.addForm.get('appointmenttypeId'); }
  //get customerId() { return this.addForm.get('customerId'); }
  //get appointmentDueDate() { return this.addForm.get('appointmentDueDate'); }
  //get fromTime() { return this.addForm.get('fromTime'); }
  //get toTime() { return this.addForm.get('toTime'); }

