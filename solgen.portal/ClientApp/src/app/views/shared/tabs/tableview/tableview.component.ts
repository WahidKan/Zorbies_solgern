import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonService, DailerParam } from '../../common.service';
import { take } from 'rxjs/operators';
import { CopyLinkModalComponent } from '../../../shared/copy-link-modal/copy-link-modal.component';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/views/contact/contact.service';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { ProposallistService } from 'src/app/views/proposal/proposallist.service';
import { WorkorderService } from 'src/app/views/workorder/workorderservice.service';
import { ContractService } from 'src/app/views/contract/contract.service';

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.scss']
})

export class TableviewComponent implements OnInit {
  @Output() openAddContact = new EventEmitter();
  @Output() openAddEditProposalPopup = new EventEmitter();
  @Output() openAddEditProductPopup = new EventEmitter<object>();
  @Output() openAddEditContractPopup = new EventEmitter<object>();
  @Output() openAddEditWorkOrderPopup = new EventEmitter<object>();
  @Output() deleteProductRequiredItem = new EventEmitter<object>();
  @Output() openAddRequirement = new EventEmitter();

  @Output() openEditProductRequirement = new EventEmitter();
  @Output() deleteProductRequirement = new EventEmitter<object>();



  @Output() openAddJurisdiction = new EventEmitter();
  @Output() openEditAddJurisdiction = new EventEmitter();
  @Output() deleteJurisdiction = new EventEmitter<object>();

  @Input('data') field: any;
  @Input('index') index: any;
  @Input('SubModuleName') SubModuleName: any;
  @Input('RecordId') RecordId: any;
  @ViewChild('CopyLinkModal', { static: false }) CopyLinkModal: CopyLinkModalComponent;
  @Input('primaryContactId') primaryContactId: any;
  @Input('primaryContractId') primaryContractId: any;
  @Input('primaryProposalId') primaryProposalId: any;
  @Input('from') from: any

  dataList: any
  Schema: any;
  Dataset: any
  proposalTableName = 'tblproposal';
  contractTableName = 'tblContract';
  workorderTableName = 'tblWorkorderNew'; //tblProducts';

  title: string = '';
  totalRecords: number = 0;
  offset: number = 1;
  custom_view_id;
  sortColumn: string = '';
  sortDir: string = 'desc';
  pageNo: number = 0;
  pageSize = 4;
  showDeleteBtn: boolean = true;
  loadSave: boolean = false;
  showAddButton: boolean = false;
  showEditDeleteBtn: boolean = false;
  showCopyButtonBtn: boolean = false;
  textHeighlightClass: "text-danger"
  proposalId: any;


  @Output() refreshEmitter = new EventEmitter<any>();

  constructor(private commanService: CommonService, private contractService: ContractService, private workorderService: WorkorderService, private toaster: ToastrService, private dialogService: ConfirmationDialogService,
    private proposalService: ProposallistService,
  ) { }

  openDailer(phoneNumber: string) {

    // this.commonService.SetdialerNumber = new DailerParam(phoneNo: "string", companyId: "string", userId: "string", objectName: "string", refId: "string");
    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    const phoneno = '+1' + phoneNumber;
    this.commanService.SetdialerNumber = new DailerParam(phoneno, userinfo['companyId'], userinfo['id'], this.SubModuleName, this.RecordId);

  }

  ngOnInit() {
    this.showEditDeleteBtn = false;
    if (this.field) {
     debugger;
      if (this.field.data) {
        debugger
        this.dataList = JSON.parse(this.field.data);
        if (this.dataList) {
          this.Dataset = this.dataList.data as [];
          this.Schema = this.dataList.schema;
          this.totalRecords = (this.Dataset.length > 0) ? this.Dataset[0].TotalRecords : 0;
          this.pageNo = (this.Dataset.length > 0) ? this.Dataset[0].PageNo : 0;
          this.offset = this.pageNo;
        }
      }

      this.custom_view_id = this.field.compact_view_id;
      this.title = this.field.compact_view_name;
      if (this.title == "Proposal") {
        ;
        this.showCopyButtonBtn = true;
      }
      this.title = this.title.replace("Compact", "");
    }
    ;
    if (this.title.includes('Contact') || this.title.includes('Product') || this.title.includes('Work') || this.title.includes('Proposal') || this.title.includes('Contract') || this.title.includes('Requirement') || this.title.includes('Jurisdiction')) { //|| this.title.includes('Proposal')
      this.showAddButton = true;
      if (this.title.includes('Contact') || this.title.includes('Product') || this.title.includes('Work') || this.title.includes('Proposal') || this.title.includes('Contract') || this.title.includes('Requirement') || this.title.includes('Jurisdiction')) { //|| this.title.includes('Proposal')
        this.showEditDeleteBtn = true;
      }
      if (this.title.includes('Product') || this.title.includes('Work') || this.title.includes('Proposal') || this.title.includes('Contract') || this.title.includes('Requirement') || this.title.includes('Jurisdiction')) { //|| this.title.includes('Proposal')
        this.showDeleteBtn = true;
      }
      else { this.showDeleteBtn = false; }
      if (this.from == 'Account' && !(this.title.includes('Contact'))) {
        this.showAddButton = false;
        this.showEditDeleteBtn = false;
        this.showDeleteBtn = false;
      }
      if (this.from == 'Account' && (this.title.includes('Contact'))) {
        this.showDeleteBtn = true;
      }
      // if ((this.title.includes('Contact'))){
      //   this.showDeleteBtn=false;
      // }


    }


  };

  get curPage(): number {
    return this.offset;
  }

  setPageNo($event) {
    this.pageNo = $event.page;
    this.Refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = $event.column.prop;
    this.Refresh();
  }

  Refresh() {
    ;
    this.loadSave = true;
    this.commanService.GetRelatedObjectsCompactView(this.custom_view_id, this.SubModuleName, this.RecordId, this.sortColumn, this.sortDir, this.pageNo, this.pageSize)
      .subscribe((resp: any) => {
        if (resp) {
          ;
          this.refreshEmitter.emit({ obj: resp, index: this.index });
          this.dataList = resp;
          this.Dataset = resp.data;
          this.loadSave = false;
        }
        else {
          this.commanService.ShowError();
          this.loadSave = false;
        }
      }, err => {
        this.commanService.ShowError();
        this.loadSave = false;
      }, () => {
        this.loadSave = false;
      });
  }

  openAddPopup(e) {

    if (e.includes('Contact')) {
      this.openAddContact.emit();
    }
    if (e.includes('Proposal')) {
      if (this.primaryContactId > 0 || this.primaryContactId == null) {
        this.openAddEditProposalPopup.emit();
      }
      else {
        this.toaster.error(`No primary contact is available. Please create primary contact before creating proposal.`);
      }
    }
    ;
    if (e.includes('Contract')) {
      if (this.primaryProposalId > 0 || this.primaryProposalId == null) {
        this.openAddEditContractPopup.emit();
      }
      else {
        this.toaster.error(`No primary Proposal is available. Please create primary proposal before creating contract.`);
      }
    }
    if (e.includes('Product')) {
      this.openAddEditProductPopup.emit();
    }
    if (e.includes('Requirement')) {
      this.openAddRequirement.emit();
    }
    if (e.includes('Jurisdiction')) {
      this.openAddJurisdiction.emit();
    }
    if (e.includes('Work')) {
      ;
      this.openAddEditWorkOrderPopup.emit();
    }

  };


  EditRecords(row) {

    // console.log("rowrowrowrowrowrow", row);
    if (this.title.includes('Product')) {
      this.openAddEditProductPopup.emit({ data: row });
    }
    if (this.title.includes('Requirement')) {
      this.openEditProductRequirement.emit(row);
    }
    if (this.title.includes('Jurisdiction')) {
      this.openEditAddJurisdiction.emit(row);
    }
    if (this.title.includes('Contact')) {
      this.openAddContact.emit(row.Id);
    }
    if (this.title.includes('Contract')) {
      this.openAddEditContractPopup.emit(row.Id);
    }
    if (this.title.includes('Proposal')) {
      this.openAddEditProposalPopup.emit(row.ProposalId);
    }
    if (this.title.includes('Work')) {
      this.openAddEditWorkOrderPopup.emit(row.Id);
    }


    //if (row.includes('Product')) {
    //  this.openAddEditProductPopup.emit({ data: row });
    //}
  };
  deleteRecords(row) {
    debugger;
    if (this.title.includes('Product')) {
      this.deleteProductRequiredItem.emit({ data: row });
    }
    if (this.title.includes('Requirement')) {
      this.deleteProductRequirement.emit(row);
    }

    if (this.title.includes('Jurisdiction')) {
      this.deleteJurisdiction.emit(row);
    }
    if (this.title.includes('Proposal')) {
      debugger;
      if (row.ProposalId == this.primaryProposalId) {
        this.toaster.error(`You can not delete Primary Proposal`);
      }
      else {
        const message = `Are you sure you want to delete Proposal "${row.Name}"?`;
        this.dialogService.confirm('Delete Proposal', message).subscribe(confirmed => {
          if (confirmed) {
            this.proposalService.DeleteRecords(row.ProposalId, this.proposalTableName).subscribe(r => {
              this.toaster.success(`Proposal "${row.Name}" has been deleted successfully`);
              this.commanService.setUpdatedOpportunity = true;
            }, error => {
            });
          }
        });
      }
    }
    if (this.title.includes('Work')) {

      const message = `Are you sure you want to delete Work Order "${row.Subject}"?`;
      this.dialogService.confirm('Delete Proposal', message).subscribe(confirmed => {
        if (confirmed) {
          this.workorderService.DeleteRecords(row.Id, this.workorderTableName).subscribe(r => {
            this.toaster.success(`Work Order "${row.Subject}" has been deleted successfully`);
            this.commanService.setUpdatedOpportunity = true;
          }, error => {
          });
        }
      });

    }
    if (this.title.includes('Contract')) {
      if (row.Id == this.primaryContractId) {
        this.toaster.error(`You can not delete Primary Contract`);
      }
      else {
      const message = `Are you sure you want to delete Contract "${row.ContractNumber}"?`;
      this.dialogService.confirm('Delete Proposal', message).subscribe(confirmed => {
        if (confirmed) {
          if (confirmed) {
            this.contractService.DeleteRecords(row.Id, this.contractTableName).subscribe(r => {
              this.toaster.success(`Contract "${row.ContractNumber}" has been deleted successfully`);
              this.commanService.setUpdatedOpportunity = true;
            }, error => {
            })
          }
        }
      
      });
    }
  }





  };
  PrimaryFunc(row: any) {
    if (row['StageId'] && row['StageId'] == "Primary") {
      return true;
    }
    return false;
  }
  goToPage(e: any) {

    this.proposalId = e.ProposalId;
    // console.log(this.proposalId);
    this.CopyLinkModal.show(this.proposalId);
  };

}
