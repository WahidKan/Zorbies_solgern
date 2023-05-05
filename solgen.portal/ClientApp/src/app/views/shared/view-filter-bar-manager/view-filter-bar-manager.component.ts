import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, dynamicsectionarray, CheckboxData, StageData, MarkAsCompleteData, fieldsJson } from '../common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeadlistService } from '../../lead/leadlist.service';
import { LeadService } from '../../lead/lead.service';
import { DateTimeToLocalForAddEditPipe } from '../../../pipes/datetime.pipe';
import { OpportunityListService } from '../../opportunity/opportunitylist.service';
import { ProposallistService } from '../../proposal/proposallist.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LeadconvertpopupComponent } from '../../lead/leadconvertpopup.component';

import { Location } from '@angular/common';
import { cssClass } from '@syncfusion/ej2-angular-lists';
@Component({
  selector: 'app-view-filter-bar-manager',
  templateUrl: './view-filter-bar-manager.component.html',
  styleUrls: ['./view-filter-bar-manager.component.scss']
})
export class ViewFilterBarManagerComponent implements OnInit {
  @ViewChild('stage', { static: false }) stage: ModalDirective;
  @Output() showConvert = new EventEmitter<string>();

  @Output() callToViewFilterBarFunction: EventEmitter<any> = new EventEmitter();

  @Output() newItemEvent = new EventEmitter<boolean>();

  @Input() moduleName: string;
  @Input() showdet: boolean;
  @Input() iconClass: string = 'feather-user';
  @Input() areButtonsVisible: boolean = true;

  @Input() headerTitleName: string = '';

  loading = false;
  showdetail:boolean=true;
  stageData: any;
  stagearray: dynamicsectionarray[];
  _formstagearray: dynamicsectionarray[] = [];
  stagedatamaster: any;
  checkflag: boolean = false;
  itemdata: any;
  editHousingvalues: any;
  title = "";
  customCompnentValues: any[] = [];
  showFormDiv: boolean = false;
  optionalParameters: boolean = false;
  showDetailDiv: boolean = false;
  formControlList: any[] = [];
  checkboxdata1: Array<CheckboxData> = [];
  form: FormGroup;
  formGroup: FormGroup;
  Id: any;
  JsonData: StageData = new StageData();

  markAsCompleteData: MarkAsCompleteData = new MarkAsCompleteData();
  scrollDataList: any;
  custom_field_id: any;
  len: any;
  field_code: any;
  searchText: string;
  stageId: any;

  buttonTitle: any;
  showMarkAsCompleteButton: boolean = false;
  is_converted: boolean = false;
  masterKey: string
  unqualifiedStage: boolean = false;
  stageName: string;
  loadSave: boolean = false;
  checkEmail: string;
  existsEmail: boolean = false;
  timeFormat: string = '12';
  cleanValues: any[] = [];
  cascadingCompnentValues: any;
  hideConstomerSatgeDtails: boolean = false;
  displayType = 'VIEW';
  companyId: any;
  additionalGroups: any[];
  groupTop: any[] = [];
  operatorList: any;
  ownerId: any = '';
  @Input() customCompnentValuesTop: any;
  @Input() acountBillingAddress: any;
  executionFlow: any[] = [];
  checkboxdataTop: Array<CheckboxData> = [];
  LeadFirstName = '';
  LeadLastName = '';
  solgenpower: boolean = true;
  companyType: any;
  @ViewChild('leadconvert', { static: false }) leadconvert: LeadconvertpopupComponent;
  isEnabledDetailsView: boolean = false;
  previousSatgeId: number = 0;
  customCompnentValues_Copy: any[] = [];
  isEditable: boolean = false;
  currentStageDataObject: any;
  stageTitle: any = '';
  @Input() pageLink: string;
  @Input() titleName: string;
  @Input() submoduleName: string;
  @Input() logoClass: string;
  @Input() adViewStatus: boolean = false;
  roleName:any;

  constructor(private route: ActivatedRoute,
    private proposalService: ProposallistService,
    private toaster: ToastrService, private commonService: CommonService,
    private leadservice: LeadlistService, private opportunityService: OpportunityListService, private leadService: LeadService, private router: Router,
    private location: Location) {


  }

  ngOnInit() {
    debugger
    //
    //console.log('customCompnentValuesTop = ' + this.customCompnentValuesTop);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.roleName = params.get('accountType');
      if (id) {
        this.Id = id;
      }
      else {
      }
    });
  }

  OnBackToListClick() {
    this.location.back();
  }
}
