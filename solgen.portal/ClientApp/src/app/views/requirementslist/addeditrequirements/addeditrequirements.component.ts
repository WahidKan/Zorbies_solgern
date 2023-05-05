import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { strategy } from '@angular-devkit/core/src/experimental/jobs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequirementModel, RequirementsService } from '../requirements.service';
import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addeditrequirements',
  templateUrl: './addeditrequirements.component.html'
})
export class AddeditrequirementsComponent implements OnInit {
  @ViewChild('addEditRequirementPopup', { static: false }) modalAddEditRequirementPopup: ModalDirective;

  @Output() callGetRequirementListingData = new EventEmitter<string>();

  requirementModel: RequirementModel = new RequirementModel();
  title: string;
  lstPertainsTo: any;
  lstType: any;
  lstServiceTerritory: any;
  lstRequiredBy: any;
  loadSave = false;
  addForm: FormGroup;

  constructor(private fb: FormBuilder,
    private requirementsService: RequirementsService,
    private commonService: CommonService,
    private el: ElementRef,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.loadSave = true;
    this.initForm();
    this.GetlstPertainsTo();
    this.GetlstType();
    this.GetlstServiceTerritory();
    this.GetlstRequiredBy();
  }


  show(row, recordType, id) {
    this.GetlstServiceTerritory();
    ;
    // console.log("row", row);
    // console.log("add", this.addForm);
    if (id == null) {
      this.initForm();
      this.title = 'New Requirement';
      this.addForm.controls.recordType.setValue(recordType);
      this.modalAddEditRequirementPopup.show();
    }
    else {
      if (id != null) {

        this.title ="Edit Requirement "
        this.addForm.patchValue({
          id: row.Id,
          Owner: row.CreatedBy,
          description: row.Description,
          isActive: row.isActive,
          Notes: row.Notes,
          requirementName: row.Name,
          meterInstalled: row.MeterInstalled,
          permittingCost: row.permittingCost,
          submitforPTO: row.SubmitforPTO,
          callforInspection: row.callforInspection,
          approvalDuration: row.approvalDuration,
          requiredby: row.Required_by__c,
          recordType: row.RecordTypeName__c,
          externalID: row.ExternalID,
          approvalReceived: row.ApprovalReceived,
          type: row.Type__c,
          pertainsTo: row.PertainsTo != null ? row.PertainsTo.toString() : null ,
          serviceTerritory: row.serviceTerritoryId != null ? row.serviceTerritoryId.toString():null,
        })
        
        this.modalAddEditRequirementPopup.show();
      }
    }
    // console.log("this.addForm", this.addForm);
  }

  close() {
    this.modalAddEditRequirementPopup.hide();
  }
  Save() {
    ;
    if (this.addForm.valid) {
        this.loadSave = true;
      this.requirementModel.Id = this.addForm.value.id;
      this.requirementModel.requirementName = this.addForm.value.requirementName;
      this.requirementModel.pertainsTo = this.addForm.value.pertainsTo;
      this.requirementModel.recordType = this.addForm.value.recordType;
      this.requirementModel.requiredby = this.addForm.value.requiredby;
      this.requirementModel.type = this.addForm.value.type;
      this.requirementModel.serviceTerritory = this.addForm.value.serviceTerritory;
      this.requirementModel.isActive = this.addForm.value.isActive;
      this.requirementModel.description = this.addForm.value.description;
      this.requirementModel.permittingCost = this.addForm.value.permittingCost;
      this.requirementModel.callforInspection = this.addForm.value.callforInspection;
      this.requirementModel.approvalDuration = this.addForm.value.approvalDuration;
      this.requirementModel.submitforPTO = this.addForm.value.submitforPTO;
      this.requirementModel.meterInstalled = this.addForm.value.meterInstalled;
      this.requirementModel.approvalReceived = this.addForm.value.approvalReceived;
      this.requirementModel.Notes = this.addForm.value.Notes;
      this.requirementModel.externalID = this.addForm.value.externalID;
      this.requirementModel.Owner = this.addForm.value.Owner;
      this.requirementsService.addeditRequirement(this.requirementModel).subscribe((result: any) => {
        ;
        if (result.statusCode == 200) {
          this.callGetRequirementListingData.emit();
            this.modalAddEditRequirementPopup.hide();
            this.loadSave = false;
            this.toaster.success(result.responseMessage);

          }
          else {
            this.loadSave = false;
            this.toaster.error(result.responseMessage);
          }
        })
    }
    else {
      for (const key of Object.keys(this.addForm.controls)) {
        if (this.addForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          // console.log("sddasd", invalidControl);
          invalidControl.focus();
          break;
        }
      }

      this.commonService.validateAllFormFields(this.addForm);
    }
  }

  private initForm() {
    this.addForm = this.fb.group({
      id: [null],
      requirementName: ['', Validators.required],
      pertainsTo: [null, Validators.nullValidator],
      requiredby: [null, Validators.nullValidator],
      type: [null, Validators.nullValidator],
      serviceTerritory: [null, Validators.nullValidator],
      isActive: [false, Validators.nullValidator],
      description: [null, Validators.nullValidator],
      permittingCost: [null, Validators.nullValidator],
      callforInspection: [null, Validators.nullValidator],
      approvalDuration: [null, Validators.nullValidator],
      submitforPTO: [null, Validators.nullValidator],
      meterInstalled: [null, Validators.nullValidator],
      approvalReceived: [null, Validators.nullValidator],
      Notes: [null, Validators.nullValidator],
      externalID: [null, Validators.nullValidator],
      Owner: [null, Validators.nullValidator],
      recordType: [null, Validators.nullValidator],
    })
  }


  get requirementName() { return this.addForm.get('requirementName'); }
  get pertainsTo() { return this.addForm.get('pertainsTo'); }
  get requiredby() { return this.addForm.get('requiredby'); }
  get type() { return this.addForm.get('type'); }
  get serviceTerritory() { return this.addForm.get('serviceTerritory'); }
  get isActive() { return this.addForm.get('isActive'); }
  get description() { return this.addForm.get('description'); }
  get permittingCost() { return this.addForm.get('permittingCost'); }
  get callforInspection() { return this.addForm.get('callforInspection'); }
  get approvalDuration() { return this.addForm.get('approvalDuration'); }
  get submitforPTO() { return this.addForm.get('submitforPTO'); }
  get meterInstalled() { return this.addForm.get('meterInstalled'); }
  get approvalReceived() { return this.addForm.get('approvalReceived'); }
  get Notes() { return this.addForm.get('Notes'); }
  get externalID() { return this.addForm.get('externalID'); }
  get Owner() { return this.addForm.get('Owner'); }
  get recordType() { return this.addForm.get('recordType'); }

  GetlstPertainsTo() {
    this.commonService.getMasterItemsList("PertainsTo").subscribe((result: any) => {
      this.lstPertainsTo = this.commonService.masters;
    })
  }

  GetlstType() {
    this.commonService.getMasterItemsList("Type").subscribe((result: any) => {
      this.lstType = this.commonService.masters;
    })
  }

  GetlstRequiredBy() {
    this.commonService.getMasterItemsList("Account").subscribe((result: any) => {
      this.lstRequiredBy = this.commonService.masters;
    })
    setTimeout(() => {
      this.loadSave =false;
    }, 1000);
  }

  GetlstServiceTerritory() {
    this.commonService.getMasterItemsList("ServiceTerritory").subscribe((result: any) => {
      this.lstServiceTerritory = this.commonService.masters;
    })
  }
}
