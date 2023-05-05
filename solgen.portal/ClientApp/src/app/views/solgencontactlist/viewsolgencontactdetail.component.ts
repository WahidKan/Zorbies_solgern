import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CustomContactListService, ContactTopViewModel, CheckboxData } from './customcontactlist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../shared/common.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { noteModel, LeadlistService } from '../lead/leadlist.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';
import { NewnoteslistComponent } from '../shared/new-notes/newnoteslist.component';
import { DateTimeToLocalForAddEditPipe } from 'dynamiccustom-list';

@Component({
  selector: 'app-viewsolgencontactdetail',
  templateUrl: './viewsolgencontactdetail.component.html',
  styleUrls: ['./viewsolgencontactdetail.component.scss']
})
export class ViewsolgencontactdetailComponent implements OnInit {
  @ViewChild('NotesPopupModel', { static: false }) addNotesPopupModel: ModalDirective;
  @ViewChild('listnotesmodel', { static: false }) listnotesmodel: NewnoteslistComponent;
  @ViewChild('listnotesmodel1', { static: false }) addNotesPopupModel1: NewnoteslistComponent;
  notemodel: noteModel = new noteModel();
  @Input() offset: number;
  isEdit = false;
  Id: any;
  moduleName = 'crm';
  submoduleName = 'contact';
  executionFlow:any[]=[];
  companyId: any;
  CasesCount: any = 0;
  customCompnentValues: any;
  formControlList: any[] = [];
  form: FormGroup;
  notescount: number =0;
  ContactLastName: any;
  loadSave = false;
  accountId: any = 0;
  displayType = 'VIEW';
  CampaignName: string = "";

  lstCampaignMembers: any = {
    pager: {},
    data: []
  }
  lstRelatedAccount: any =
    {
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
  contactCount: number = 0;
  leadCount: number = 0;
  relatedAccountListCount: any;
  proposalsCount: number = 0;
  leadsCount: number = 0;

  pageNo: number = 0;
  pageSize: number = 10;
  sortDir: string = 'desc';
  sortColumn: any = 'createdOn';

  campaignMemberPageNo: number = 0;
  proposalsPageNo: number = 0;
  leadsPageNo: number = 0;
  isLoanHomi: boolean = false;
  title: any;

  submoduleid: any = 1;
  objectname: any = 'Contact';
  currentPageNotes: number;
  pageSizeValuenotes: number = 4;
  NotespagedData: any = {
    pager: {},
    data: []
  };
  NotesCount: number = 0;
  isViewNote = false;
  notesTitle: any;
  notesDescription: any;
  contentHeader: object;
  customCompnentValuesTop: Array<ContactTopViewModel> = [];
  siteurl: string = '';
  constructor(
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService,
    private fb: FormBuilder,
    private contractService: CustomContactListService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private leadservice: LeadlistService,
    private location: Location) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      // console.log('userdetail', userdetail);
      if(userdetail.companyType != undefined)
      {
      if (userdetail.companyType.toUpperCase() == 'COMPANYTYPEFINANCIALINSTITUTE') {
        this.isLoanHomi = true;
      }
        
      }
    });
  }
  checkboxdata1: Array<CheckboxData> = [];
  primaryContactPageNo: number = 0;
  primaryContactCount: number = 0;
  lstPrimaryContact: any = {
    pager: {},
    data: []
  }

  ngOnInit() {
    this.siteurl = window.location.origin;
    // console.log('siteurl', this.siteurl);
    this.loadSave = true;
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.Id = id;
      })
    this.currentPageNotes = 1;
    this.GetCustomFieldsList();
    this.getRelatedData();
    this.getNoteslist();
  
    this.initBreadCrumb();
  }
  
initBreadCrumb() 
{
  
   this.contentHeader = {
     headerTitle: 'Manage Contact',
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
           name: 'Manage Contact',
           isLink: true,
           link: '/contactlist'
         },
         {
           name: 'Contact Details',
           isLink: false
         }

       ]
   };
 }

  getRelatedData() {
    ;
    this.refreshMembersList();
    this.refreshProposalsList();
    this.refreshRelatedAccountList();
    this.refreshLeadsList();
    this.refreshPrimaryContactList();
  }
  addItem(newItem: number) {
    this.notescount = newItem;
    this.addNotesPopupModel1.getNoteslist();
  }
  close() {
    this.router.navigateByUrl("/contactlist");
  }
  GetCustomFieldsList() {
    // alert(this.submoduleName)
    this.contractService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {

      // console.log("data", this.contractService.customFieldsList.data);
      if (result) {
        this.customCompnentValues = this.contractService.customFieldsList.data;
        
        // this.executionFlow=this.contractService.customFieldsList.executionFlow;
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
        let fname = "", lname = "", salutation = '';
        // console.log(" this.customCompnentValues", this.customCompnentValues);
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

         // if (cnt.ColumnName == 'Title' || cnt.ColumnName == 'DirectLine' || cnt.ColumnName == 'Email') {

            let row: ContactTopViewModel = new ContactTopViewModel();

            if (cnt.ColumnName == 'Title')
              row.DisplayOrder = 1;
            else if (cnt.ColumnName == 'DirectLine')
              row.DisplayOrder = 2;
            else if (cnt.ColumnName == 'Email')
              row.DisplayOrder = 3;

            row.ColumnName = cnt.ColumnName;
            row.DisplayName = cnt.display_name;
            row.Value = cnt.value;
            this.customCompnentValuesTop.push(row);
            this.customCompnentValuesTop.sort((a, b) => a.DisplayOrder > b.DisplayOrder ? 1 : -1);
          //}
          
          if (cnt.ColumnName == 'FirstName') {
            fname = cnt.value;
          }

          else if (cnt.ColumnName == 'LastName') {
            lname = this.CampaignName + " " + cnt.value;
          }
          else if (cnt.ColumnName == 'Salutation') {
            if (cnt.value != undefined && cnt.value != null && cnt.value != '')
              salutation = this.CampaignName + " " + cnt.value;
          }
          //////if (cnt.ColumnName == 'AccountId') {
          //////  // 
          //////  this.CampaignName = cnt.value;
          //////  if (cnt.value != '' && cnt.select_options != null) {
          //////    cnt.select_options.forEach(itemList => {
          //////      if (itemList.value == cnt.value) {
          //////        cnt.value = itemList.name;
          //////        this.CampaignName = itemList.name;
          //////        //alert(this.CampaignName)
          //////      }
          //////    });
          //////  }
          //////}

          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });
        this.customCompnentValuesTop =   this.customCompnentValuesTop.filter(x => x.ColumnName == 'Email' ||  x.ColumnName == 'OwnerId' ||  x.ColumnName == 'AccountId' ||  x.ColumnName == 'MobilePhone' ||  x.ColumnName == 'Service_Territory');

        this.CampaignName = salutation + " " + fname + " " + lname;
        this.form = new FormGroup(group);
  /////////////////////////////////Flowwww////////////////////////////

  let flowList=this.contractService.customFieldsList.executionFlow;
  flowList.forEach(item => {
    let itmevisible = 'yes';
    if (item.filterConditions)
      item.filterConditions.forEach(condi => {
        let fieldValue = this.customCompnentValues.find(x => x.custom_field_id == Number(condi.field)).value;
       
        if (itmevisible == 'yes') {
          if (condi.operator == "=") {
            if (fieldValue.toLowerCase() == condi.value.toLowerCase()) {
              item.isVisible = true;
              if (item.visibilityCondition == '2')
                    itmevisible = 'no'
            }
            else {
              item.isVisible = false;
            }
          }
          else if (condi.operator == "<>") {
            if (fieldValue.toLowerCase() != condi.value.toLowerCase()) {
              item.isVisible = true;
            }
            else {
              item.isVisible = false;
            }
          }
        }
       

        if (item.visibilityCondition) {
          // -----AND
          if (item.visibilityCondition == '1') {

            if (itmevisible == 'yes') {
              if (item.isVisible) {
                itmevisible = 'yes'
              }
              else {
                itmevisible = 'no'
              }
            }
            else {
              item.isVisible = false;
            }
          }
          // -----OR               
        }
      });
    else
      item.isVisible = true;
  });
  
  this.executionFlow = flowList.filter(x => x.isVisible == true);

  this.loadSave = false;
      }

    });

     //console.log("row", this.customCompnentValuesTop);
  }

  ExecuteAutomationFlow(AutomationId){
    ;
    // console.log(AutomationId);
    window.open(`/automation-flow-execution/execution/${AutomationId}/${this.Id}`, "_blank");
    // let url = `/automation-flow-execution/execution/${AutomationId}/${this.Id}`
    // this.router.navigateByUrl(url);
  }
  onCampaignMembersSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.name;
    this.refreshMembersList();
  }

  onRelatedSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.name;
    this.refreshRelatedAccountList();
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
    this.contractService.GetCampaignMembersList(this.Id, this.sortColumn, this.sortDir, this.campaignMemberPageNo, this.pageSize).subscribe(resp => {
      debugger
      const convertdatetime = new DateTimeToLocalForAddEditPipe();
      this.lstCampaignMembers = resp;
      
      if(this.lstCampaignMembers.data.length > 0)
      {
        this.lstCampaignMembers.data.forEach( x=> {
          if(x.CloseDate)
              {
                x.CloseDate =  (x.CloseDate == '' ? null : convertdatetime.transform(x.CloseDate, 'Date')); // to convert to local time
                  //console.log(x.CloseDate);
              }
          })

      }
      // console.log('this.lstCampaignMembers', this.lstCampaignMembers);
      this.campaignMembersCount = resp.pager.totalItems;

    });
  }

  refreshRelatedAccountList() {
    this.contractService.GetRelatedAccountForContactList(this.Id, this.sortColumn, this.sortDir, this.proposalsPageNo, this.pageSize).subscribe(resp => {
      this.lstRelatedAccount = resp;
      this.relatedAccountListCount = resp.pager.totalItems;

    });

  }
  refreshProposalsList() {
    this.contractService.GetProposalsListByContactId(this.Id, this.sortColumn, this.sortDir, this.proposalsPageNo, this.pageSize).subscribe(resp => {
      this.lstProposals = resp;
      this.proposalsCount = this.lstProposals.pager.totalItems;
    });
  }

  refreshLeadsList() {
    this.contractService.refreshLeadsList(this.Id, this.sortColumn, this.sortDir, this.leadsPageNo, this.pageSize).subscribe(resp => {
      this.lstLeads = resp;
      this.leadsCount = resp.pager.totalItems;
      // console.log("lstLeads", this.lstLeads);
    });
  }

  setcampaignMemberPageNo($event) {
    this.campaignMemberPageNo = $event.page;
    this.refreshMembersList();
  }
  //onRelatedSort
  setRelatedPageNo($event) {
    this.proposalsPageNo = $event.page;
    this.refreshRelatedAccountList();
  }

  setLeadsPageNo($event) {
    this.leadsPageNo = $event.page;
    this.refreshLeadsList();
  }
  setProposalsPageNo($event) {
    this.leadsPageNo = $event.page;
    this.refreshProposalsList();
  }

  //============================Notes Section ======================================

  AddNotes() {
    this.title = "Add Notes";
    this.addNoteForm.reset();
    this.isViewNote = false;
    this.listnotesmodel.show(this.Id);
  }
  //========================Getting Note Form Value=============================
  get note_id() { return this.addNoteForm.get('note_id'); }
  get noteTitle() { return this.addNoteForm.get('noteTitle'); }
  get noteDescription() { return this.addNoteForm.get('noteDescription'); }
  //=============================================================================
  addNoteForm = this.fb.group({
    note_id: [null],
    noteTitle: ['', Validators.required],
    noteDescription: ['', Validators.required]
  });

  SaveNote() {
    this.loadSave = true;
    if (this.addNoteForm.valid) {
      this.notemodel.note_id = this.addNoteForm.value.note_id;
      this.notemodel.note_name = this.addNoteForm.value.noteTitle;
      this.notemodel.note_description = this.addNoteForm.value.noteDescription;
      this.notemodel.object_name = "Contact";
      this.notemodel.object_ref_id = this.Id;
      this.notemodel.object_id = 1;
      this.leadservice.saveNotes(this.notemodel).subscribe((result: any) => {

        if (result.statusCode == 200) {
          //setTimeout(() => {  // console.log('notes') }, 3000);
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.addNoteForm.reset();
          this.getNoteslist();
          this.addNotesPopupModel.hide();
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      });

    }
    else {
      this.commonService.validateAllFormFields(this.addNoteForm);
      this.loadSave = false;
    }
  }

  getNoteslist() {
    // console.log("dsadas", this.currentPageNotes);
    ;
    this.loadSave = true;
    this.leadservice.getNoteslist(this.Id, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.currentPageNotes, this.pageSizeValuenotes, '').subscribe(response => {

      this.NotespagedData = this.leadservice.pagedData;
      this.NotesCount = this.leadservice.pagedData.pager.totalItems;
      this.offset = this.currentPageNotes;
      this.loadSave = false;
    })
  }

  closeNotesPopupModelPopup() {
    this.addNotesPopupModel.hide();
    this.addNoteForm.reset();
  }

  setPageNotes($event) {
    this.loadSave = true;
    this.currentPageNotes = $event.page;
    this.getNoteslist();

  }

  onSortNotes($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPageNotes = 1;
    this.loadSave = true;
    this.getNoteslist();
  }

  get curPageNotes(): number {
    return this.offset;
  }

  EditNotes(row: any) {
    this.title = "Edit Notes";
    this.isEdit = true;
    this.isViewNote = false;
    this.addNoteForm.patchValue({
      note_id: row.note_id,
      noteTitle: row.note_name,
      noteDescription: row.note_description,
    });
    this.addNotesPopupModel.show();
  }

  DeleteNote(row) {
    const message = `Are you sure you want to delete Note?`;
    this.dialogService.confirm('Delete Note', message).subscribe(confirmed => {
      if (confirmed) {
        this.contractService.DeleteRecords(row.note_id, 'tblNotes').subscribe((res: any) => {
          this.toaster.success(`Note has been deleted successfully.`);
          this.currentPageNotes = 1;
          this.getNoteslist();
        });
      }
    });
  }
  ViewNotes(row: any) {
    this.isViewNote = true;
    this.notesTitle = row.note_name;
    this.notesDescription = row.note_description;

    this.addNotesPopupModel.show();
  }
  OnBackToListClick() {
    this.location.back();
  }

  // ======================== Opertunity Primary Contact ============================

  setPrimaryContactPageNo($event) {
    ;
    this.primaryContactPageNo = $event.page;
    this.refreshPrimaryContactList();
  }

  onPrimaryContactSort($event) {
    ;
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.name;
    this.refreshPrimaryContactList();
  }

  refreshPrimaryContactList() {
    //this.contractService.GetCampaignMembersList(this.Id, this.sortColumn, this.sortDir, this.primaryContactPageNo, this.pageSize).subscribe(resp => {
    //  this.lstPrimaryContact = resp;
    //  // console.log('this.lstPrimaryContact', this.lstPrimaryContact);
    //  this.primaryContactCount = resp.pager.totalItems;
    //});
  }
  //================================================================================
}
