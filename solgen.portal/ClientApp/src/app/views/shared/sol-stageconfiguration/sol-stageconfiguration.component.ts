import { Component, OnInit, ViewChild } from '@angular/core';
//import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';




import { DatatableComponent } from '@swimlane/ngx-datatable';
import { stagepagelinks, SubstageModel, substage, savesubstageModel, ConfigurationsettingService } from '../../configurationsetting/configurationsetting.service';
import { ModuleList, CommonService } from '../common.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { LayoutControlModel, GroupControls, Group } from '../../managelayout/layout.service';

@Component({
  selector: 'app-sol-stageconfiguration',
  templateUrl: './sol-stageconfiguration.component.html',
  styleUrls: ['./sol-stageconfiguration.component.scss']
})
export class SolStageconfigurationComponent implements OnInit {


  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('addFormModal', { static: false }) addFormModal: ModalDirective;
  lstUserType: any;
  sustagelist: any;
  lstpage: any;
  StopDragEnabled: boolean = true;
  lstpagearray: stagepagelinks[] = [];
  stageform: FormGroup;
  addstageForm: FormGroup;
  selectedTexts: any[] = [];
  selectedPages: any[] = [];
  selectedPagesmaster: any[] = [];
  fieldmodel: any[] = [];
  count: boolean = true;
  stagemodel: SubstageModel = new SubstageModel();
  substage: substage = new substage();
  savesubstageModel: savesubstageModel = new savesubstageModel();
  index: number = -1;
  IsDetail = true;
  isDuplicate: boolean = false;


  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;

  sortDir = 'desc';
  sortColumn = 'createdon';
  pagedData: any = {
    pager: {},
    data: []
  };
  moduleId: any;
  subModuleId: any;
  lstsubModule: any;
  loadSave = false;
  lstPageSize: any
  pageSizeValue: number;
  lstModule: any;
  batchid: number = 0;
  showstage: boolean = false;
  isFinancial: boolean = false;
  isStateManagement: boolean = false;
  subModuleName: any;
  displayCode = 'VIEW';
  moduleName: any;
  customCompnentValues: any[] = [];

  dragOperation: boolean = false;

  groupControl: GroupControls;
  groupControl1: GroupControls[];
  group: Array<Group> = [];
  SaveLayoutvalidation: boolean = false;
  controls: Array<GroupControls> = [];
  saveLayout: LayoutControlModel[];
  formName: string = "";
  stageformName: string = "";
  stageformId: number;
  showFormName: boolean = false;
  stageFormDetail = [];
  isSuperAdmin:any;

  constructor(private fb: FormBuilder, private configurationsettingService: ConfigurationsettingService, private router: Router, private dialogService: ConfirmationDialogService,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {
    this.commonService.getMasterItemsList("solgen_usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;

    })
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      // console.log('userdetail', userdetail);
      if (userdetail.companyType === 'companytypeFinancialInstitute' || userdetail.companyType === 'companytypeCRMLoanInstall') {
        this.isFinancial = true;
        if (this.isFinancial == true) {
          this.showstage = true;
        }
      }
    });
    this.commonService.getMasterItemsList("sol_custom_modules").subscribe((result: any) => {
      this.lstModule = this.commonService.masters;
      // console.log('lstModule', this.lstModule);
      // console.log('isFinancial', this.isFinancial);
      this.loadSave = false;
      this.lstModule.filter(x => {

        if (this.isFinancial) {
          if (x.name.toLowerCase() == "finance") {
            this.moduleId = x.value;
            this.SetSubmoduleValue(this.moduleId);
            // console.log('moduleId', this.moduleId);
          }
        }

      });



    })
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
  }

  ngOnInit() {
    
    // this.loadSave = true;
    this.initForm();
    this.pageSizeValue = 10;
    debugger
    var ab = this.commonService.getQueryStringValue("id");
    if (ab != null) {
      this.batchid = parseInt(ab);
      this.IsDetail = false;

      this.fillform(parseInt(ab), this.moduleId, this.subModuleId);

    }
    var mid = this.commonService.getQueryStringValue("moduleid");
    var sid = this.commonService.getQueryStringValue("submoduleid");
    if (mid != null && sid != null) {
      this.moduleId = mid;

      this.SetSubmoduleValue(this.moduleId);
      this.subModuleId = sid;

      this.SetStatusValue(this.subModuleId);
      this.isStateManagement = true;
      // console.log('.moduleId', this.moduleId)
      // console.log('.subModuleId ', this.subModuleId)
    }

  }
  private initForm() {
    this.stageform = this.fb.group({
      fields: this.fb.array([this.buildFields()]),
      sequence_mandatory: [false]
    });

  }



  get fields(): FormArray {
    return this.stageform.get('fields') as FormArray;
  }
  getusertype() {
    this.commonService.getMasterItemsList("solgen_usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
    })
  }
  fillform(id: any, moduleid: any, submoduleid: any) {
    
    this.showstage = true;
    // this.loadSave = true;
    while (this.fields.length != 0) {
      this.fields.removeAt(0);
    }
    setTimeout(() => {
      this.fields.reset();

      let currentContext = this;

      this.configurationsettingService.getloansubstage(id, moduleid, submoduleid).subscribe((result: any) => {


        // console.log('result', result);
        debugger
        currentContext.stageform.patchValue({
          sequence_mandatory: result[0].sequence_mandatory
        })
        if (this.moduleId != result[0].moduleid) {
          this.moduleId = result[0].moduleid.toString();

          this.SetSubmoduleValue(this.moduleId);
          this.subModuleId = result[0].submoduleid.toString();
        }
        let arr = [];
        arr = result;



        if (result.length > 0) {
          currentContext.fields.removeAt(0);
        }

        arr.forEach((x, i) => {

          // let objlist = new stagepagelinks();
          //x.pages.split(',').forEach((item) => {
          //  objlist = new stagepagelinks();
          //  objlist.id = i;
          //  objlist.values = item;
          //  currentContext.lstpagearray.push(objlist);
          //});



          x.usertype = x.usertype.split`,`.map(x => +x)
          result.usertype = x.usertype.map(function (value) {
            return String(value);
          });
          //x.pages = x.pages.split`,`.map(x => +x)
          //result.pages = x.pages.map(function (value) {
          //  return String(value);
          //});


          currentContext.selectedTexts = [];
          currentContext.selectedPages = [];
          currentContext.selectedPagesmaster = [];
          result.usertype.forEach((x) => {
            currentContext.selectedTexts.push(x);
          })
          //result.pages.forEach((x) => {
          //  currentContext.selectedPages.push(x);
          //})
          if (x.pagesmaster != null) {
            x.pagesmaster = x.pagesmaster.split`,`.map(x => +x)
            result.pagesmaster = x.pagesmaster.map(function (value) {
              return String(value);
            });
            result.pagesmaster.forEach((x) => {
              currentContext.selectedPagesmaster.push(x);
            })
          }

          if (x.parentid === null) {
            this.fields.push(this.fb.group({
              id: [x.id],
              stagename: [x.stagename, Validators.required],
              substageid: [x.substageid],
              duedays: [x.duedays],
              usertype: [currentContext.selectedTexts, Validators.required],
              pages: [x.pages],
              pagesmaster: [currentContext.selectedPagesmaster],
              mandatory: [x.mandatory],
              isDefault:[x.isDefault],
              'showFormName': [x.pages, Validators.required],
              'FormId': [x.formmasterId, Validators.required],
              substages: new FormArray([]),
              //stageformName: [x.pages]
              //display_order: [x.display_order]
              //index: this.fields.length
            })
            )
            ;
            // console.log('fields', this.fields);
            if (this.batchid != 0) {
              this.fields.controls.forEach(m => {
                m.get('pages').disable();

              });


            }
          }
          else {

            const control = <FormArray>this.stageform.get('fields');
            const VB = (<FormArray>(control.controls[control.controls.findIndex((item) => item.value.id == x.parentid)].get('substages')));
            VB.push(this.buildFieldsstagesnew(x, currentContext.selectedTexts, currentContext.selectedPages, currentContext.selectedPagesmaster));

            //this.substagefields.controls.forEach(m => { 
            //  m.get('pagessubstage').disable();
            //});



          }
        });
      });
      this.pagelist(this.moduleId, this.subModuleId);
      this.GetSubStageDll();
      this.pageSizeValue = 10;
      this.getPageSizes();
      this.getusertype();
      this.loadSave = false;
    }, 2000);


  }
  //OnCheckedSequence(f: FormGroup, e): string {

  //  const len = (<FormArray>f.get('substages')).controls.length;
  //  if (len > 1) {
  //    return (<FormArray>f.get('substages')).controls[len - 1].get("issequenceforsubstage").value === "Sequence" ? "Sequence" : "Parallel"


  //  }
  //  return "Sequence";

  //}
  //OnCheckedParallel(f: FormGroup, e): string {
  //  const len = (<FormArray>f.get('substages')).controls.length;

  //  if (len > 1) {
  //    return (<FormArray>f.get('substages')).controls[len - 1].get("issequenceforsubstage").value === "Parallel" ? "Parallel" : "Sequence"


  //  }
  //  return "Parallel";

  //}



  //OnSequenceChanged(f: FormGroup, e) {


  //  (<FormArray>f.get('substages')).controls.forEach(s => {
  //    s.patchValue(
  //      {
  //        isSequence: e.target.value
  //      });
  //  })

  //}
  setseqvalue(f: FormGroup, valuesel, i) {

    //const controls = <FormArray>this.stageform.get('fields');

    //const VB = (<FormArray>(controls.controls[i].get('substages')));
    //VB.controls.forEach(m => {

    //  m.get('issequenceforsubstage').setValue(valuesel.target.value);

    //})

    (<FormArray>f.get('substages')).controls.forEach(s => {
      //// // console.log(s);


      s.get('issequenceforsubstage').setValue(valuesel.target.value);

    })



  }
  addFields() {

    this.fields.push(this.buildFields());
  }
  ShowForms(field, type) {

    var linkPages = "";
    // console.log('field.value', field.value);
    var pages = type == "sub" ? field.value.pagessubstage : field.value.pages;
    var formpages = type == "sub" ? field.value.pagessubmaster : field.value.pagesmaster;



    pages.forEach((item) => {
      var items = this.lstpage.filter(function (val) {
        return val.value == item;
      });
      if (items != null) {
        if (linkPages.length > 0) {
          linkPages += ",";
        }
        linkPages += items[0].text;
      }
    });
    var item = {
      LinkFormMaster: linkPages,
      loan_app_stage_name: linkPages,
      ApplicantSubmitted: 0,
      CoApplicantSubmitted: 0,
      ExpansesSubmitted: 0,
      InstallationPropertySubmitted: 0,
      LoanInformationSubmitted: 0,
      NTPSubmitted: 0,
      PaymentInfoSubmitted: 0,
      ProductInfoSubmitted: 0,
      ReleaseFundsSubmitted: 0,
      formmasterid: JSON.stringify(formpages),
      stageActive: 0,
      stageName: type == "sub" ? field.value.substagename : field.value.stagename,
      stageclass: "step-grey",
      userTypes: ""
    };
  }
  get substagefields(): FormArray {
    //  //this.MaintFormGroup.get('FormArrayOne');
    //  //control.push(this.initArrayOne());

    const control = <FormArray>this.stageform.get('fields');
    return control.controls[0].get('substages') as FormArray;


  }
  removeSubstageFields(f: FormGroup, i: any) {
    const message = `Are you sure you want to delete substage ?`;
    this.dialogService.confirm('Delete Substage', message).subscribe(confirmed => {
      if (confirmed) {
        const ab = ((<FormArray>f.get('substages')));
        ab.removeAt(i);
        let arr = [];
        arr = this.fields.value;
        this.lstpagearray = [];
        arr.forEach((x, i) => {

          //let objlist = new stagepagelinks();
          //x.pages.forEach((item) => {
          //  objlist = new stagepagelinks();
          //  objlist.id = i;
          //  objlist.values = item;
          //  this.lstpagearray.push(objlist);
          //});
        });
        this.toaster.success(`Substage has been deleted successfully..`);


      }
    });


  }

  //addSubStageFields(i) {
  //  const control = <FormArray>this.stageform.get('fields');

  //  const VB = (<FormArray>(control.controls[i].get('substages')));

  //  if (VB.controls.length >= 3) {
  //    this.toaster.success("You can not add more than 3 sub stages.");

  //  }
  //  else {
  //    const VB = (<FormArray>(control.controls[i].get('substages')));
  //    VB.push(this.buildFieldsstages());
  //  }

  //}


  addSubStageFields(i) {
    const control = <FormArray>this.stageform.get('fields');

    const VB = (<FormArray>(control.controls[i].get('substages')));
    if (VB.controls.length >= 3) {

      this.toaster.error("You can not add more than 3 sub stages.");
    }
    else {


      let data: string = "Sequence";
      if (VB.controls.length > 0) {
        data = VB.controls[0].get("issequenceforsubstage").value.toString();
      }
      VB.push(this.buildFieldsstages(data));
    }
  }



  //CheckValue() {

  //  const control = <FormArray>this.stageform.get('fields');
  //}
  pagelist(moduleid: any, submoduleid: any) {
    
    this.configurationsettingService.GetStagePages(moduleid, submoduleid).subscribe((result: any) => {
      // console.log('result23', result);
      
      this.lstpage = result;
    })
  }
  removeFields(index: any) {
    const message = `Are you sure you want to delete Stage?`;
    this.dialogService.confirm('Delete Stage', message).subscribe(confirmed => {
      if (confirmed) {
        this.fields.removeAt(index);

        let arr = [];
        arr = this.fields.value;

        this.lstpagearray = [];
        arr.forEach((x, i) => {

          //let objlist = new stagepagelinks();
          //x.pages.forEach((item) => {
          //  objlist = new stagepagelinks();
          //  objlist.id = i;
          //  objlist.values = item;
          //  this.lstpagearray.push(objlist);
          //});
        });
        this.toaster.success(`Stage has been deleted successfully..`);

   
     }
   });


  }

  GetSubStageDll() {
    this.configurationsettingService.GetSubStageDll().subscribe((result: any) => {

      this.sustagelist = result;
    }
    )
  }

  addeditstage() {
    // this.loadSave = true;
    if (this.stageform.valid) {
      var sequencemandatory = this.stageform.value.sequence_mandatory;
      let data: any[] = [];
      for (var i = 0; i < this.fields.controls.length; i++) {
        data.push(this.fields.controls[i].value);
        this.fields.controls[i].value.display_order = i;
      }

      var stagedata = JSON.stringify(data)


      // console.log('stagedata', stagedata);

      this.savesubstageModel.batchid = this.batchid;
      this.savesubstageModel.stagedata = stagedata
      this.savesubstageModel.sequencemandatory = false;
      this.savesubstageModel.subModuleId = this.subModuleId;
      this.savesubstageModel.moduleId = this.moduleId;

      this.configurationsettingService.saveSubstageConfigFromSolgen(this.savesubstageModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.moduleId = this.moduleId;
          this.subModuleId = this.subModuleId;
          this.loadSave = false;
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.stageform);
      this.loadSave = false;

    }
  }

  buildFields(): FormGroup {
    this.index = this.index + 1;
    return this.fb.group({
      id: [''],
      stagename: ['', [Validators.required , this.checkIfUnique(this.index)]],
      substageid: [null],
      duedays: [''],
      usertype: [null, Validators.required],
      pages: [null],
      'showFormName': [null, Validators.required],
      'FormId': [null, Validators.required],
      mandatory: [false, ''],
      display_order: [''],
      sname: [''],
      sutype: [null],
      ptype: [null],
      substages: new FormArray([])
    });
  }

  buildFieldsstages(val: string = null): FormGroup {

    return this.fb.group({
      id: [''],
      substagename: ['', Validators.required],
      usertypesubstage: [null, Validators.required],
      pagessubstage: [null],
      pagessubmaster: [null, Validators.nullValidator],
      issequenceforsubstage: [val, Validators.required],
      'showFormName': [null, Validators.required],
      'FormId': [null, Validators.required]

    });
  }

  buildFieldsstagesnew(x: any, selectedTexts: any, selectedPages: any, selectedformPages: any): FormGroup {
    let control = this.fb.group({
      id: [x.id],
      substagename: [x.stagename, Validators.required],
      usertypesubstage: [selectedTexts, Validators.required],
      pagessubstage: [selectedPages, Validators.nullValidator],
      pagessubmaster: [selectedformPages, Validators.nullValidator],
      issequenceforsubstage: [(x.issequenceforsubstage), Validators.required],
      'showFormName': [x.pages, Validators.required],
      'FormId': [x.formmasterId, Validators.required],

    });
    if (this.batchid != 0) {
      control.get('pagessubstage').disable();
    }
    return control;
  }

  //selcdropdown(e: any, field: any, i: number) {
  //  // console.log('4555', e);
  //  let _length = e.length;
  //  let flag = true;
  //  if (_length > 0) {

  //    this.lstpagearray.forEach((item) => { if (item.id != i && item.values == e[_length - 1].value) { flag = false; return; } });
  //    if (flag) {
  //      let linkspages = new stagepagelinks();
  //      linkspages.id = i;
  //      linkspages.values = e[_length - 1].value;

  //      var index1 = this.lstpagearray.findIndex((item) => item.values == e[_length - 1].value);
  //      if (index1 == -1) {
  //        this.lstpagearray.push(linkspages);
  //      }
  //    }
  //    else {

  //      //var valuess = field.value.pages.splice(field.value.pages.indexOf(e[_length - 1].value), 0);
  //      var index = field.value.pages.indexOf(e[_length - 1].value);

  //      if (index > -1) {
  //        //field.value.pages.splice(index, 1);
  //        let arrvval = field.value.pages.splice(index, 1);
  //        field.get('pages').setValue(field.value.pages);
  //      }
  //      this.toaster.success("This section is already linked.");
  //    }
  //  }
  //  return flag;
  //}

  //resetlinkpages(e: any, field: any, i: number) {
  //  var index = this.lstpagearray.findIndex(item => item.values === e.value.value);
  //  if (index > -1) {
  //    this.lstpagearray.splice(index, 1);
  //    var index11 = field.value.pages.indexOf(e.value.value);
  //    if (index11 > -1) {
  //      let arrvval = field.value.pages.splice(index, 1);
  //      field.get('pages').setValue(field.value.pages);
  //    }
  //  }
  //}

  get stagename() { return this.stageform.get('stagename'); }
  get substageid() { return this.stageform.get('substageid'); }
  get duedays() { return this.stageform.get('duedays'); }
  get usertype() { return this.stageform.get('usertype'); }
  get substages() { return this.stageform.get('substages'); }
  get pages() { return this.stageform.get('pages'); }
  get pagesmaster() { return this.stageform.get('pagesmaster'); }
  get mandatory() { return this.stageform.get('mandatory'); }
  get display_order() { return this.stageform.get('display_order'); }
  get sequence_mandatory() { return this.stageform.get('sequence_mandatory'); }

  get substagename() { return this.stageform.get('substagename'); }
  get usertypesubstage() { return this.stageform.get('usertypesubstage'); }
  get pagessubstage() { return this.stageform.get('pagessubstage'); }


  /////////////////lOan list start

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  onChange($event) {
    this.configurationsettingService.getStagesList(this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleId, this.subModuleId).subscribe(response => {
      this.pagedData = this.configurationsettingService.pagedData;
    }, error => {
    });
  }

  refresh() {
    
    this.configurationsettingService.getStagesList(this.sortColumn, this.sortDir, this.lstPageSize, this.pageSizeValue, this.moduleId, this.subModuleId).subscribe(response => {

      this.pagedData = this.configurationsettingService.pagedData;

    }, error => {
      ;
    })
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.lstPageSize = $event.page - 1;
    this.configurationsettingService.getStagesList(this.sortColumn, this.sortDir, this.lstPageSize, this.pageSizeValue, this.moduleId, this.subModuleId).subscribe(response => {

      this.pagedData = this.configurationsettingService.pagedData;

    }, error => {
      ;
    })
  }

  setPage($event) {

    this.lstPageSize = $event.page - 1;
    this.configurationsettingService.getStagesList(this.sortColumn, this.sortDir, this.lstPageSize, this.pageSizeValue, this.moduleId, this.subModuleId).subscribe(response => {

      this.pagedData = this.configurationsettingService.pagedData;

    }, error => {
      ;
    })
  }


  Batchid(id: any) {
    this.batchid = id;
    var element1 = document.getElementById("list-stage");
    var element2 = document.getElementById("liststage");
    element1.classList.remove("active");
    element2.classList.remove("active");
    element2.classList.remove("hide");

    var element = document.getElementById("lead-tab");
    var element3 = document.getElementById("Stage");
    element.classList.add("active");
    element3.classList.add("active");
    element3.classList.add("show");

    this.fillform(this.batchid, this.moduleId, this.subModuleId);

  }

  loanapp(id: any) {
    this.router.navigate(['loanApplication'], { queryParams: { id: id } });
  }

  cancel() {
    this.batchid = 0;
    this.moduleId = null;
    this.subModuleId = null;
    this.showstage = false;
    this.pagelist(this.moduleId, this.subModuleId);
    this.GetSubStageDll();
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
    //this.fillform(this.batchid, this.moduleId, this.subModuleId);
    this.router.navigateByUrl("/configurationsetting/stageconfig");
  }



  SetSubmoduleValue(event, name = null) {
    this.moduleName = name;
    this.moduleId = event;
    this.lstsubModule = null;
    this.subModuleId = null;
    this.commonService.getMasterSubModuleList(event, "sol_custom_sub_modules").subscribe((result: any) => {
      this.lstsubModule = this.commonService.masters;
      // console.log('this.lstsubModule', this.lstsubModule);

      this.lstsubModule.filter(x => {

        if (this.isFinancial) {
          if (x.name == "loanapplication") {
            this.subModuleId = x.value
            // console.log('subModuleId', this.subModuleId);
            this.SetStatusValue(this.subModuleId);
          }
          //
        }
      });

    })
  }

  SetStatusValue(event, name = null) {
    debugger
    this.subModuleName = name;
    this.subModuleId = event;
    this.showstage = true;
    this.pagelist(this.moduleId, this.subModuleId);

    this.fillform(this.batchid, this.moduleId, this.subModuleId);

    this.refresh();


    // console.log('subModuleId', this.subModuleId)
    // console.log('moduleId', this.moduleId)
  }

  calaulate() {
    setTimeout(() => {
      this.loadSave = false;
      this.table.recalculate();
      this.table.recalculateColumns();
    }, 200);
  }

  object: FormGroup;
  addForms(field: FormGroup) {
    this.addFormModal.show();

    setTimeout(() => {

      this.getCustomFieldData();

    }, 200);

    this.object = field;
    // console.log('this.object', this.object)


  }

  viewForm() {

    this.getCustomFieldData();
    this.addFormModal.show();
  }
  editForms(field: FormGroup) {
    debugger
    this.object = field;
    this.configurationsettingService.GetStageFormDetail(field.value.FormId).subscribe((result: any) => {
      if (result) {
        ;
        this.stageFormDetail = this.configurationsettingService.StageFormFieldsList;
        this.formName = this.stageFormDetail[0].name;
        this.containers[1].widgets = this.stageFormDetail;
        this.getCustomFieldData();
        this.addFormModal.show();
      }

      // console.log('this.stageFormDetail', this.stageFormDetail)
    })
  }

  close() {
    this.addFormModal.hide();
    this.formName = '';
    this.containers[0].widgets = [];
    this.containers[1].widgets = [];

  }

  getCustomFieldData() {
    //;
    this.configurationsettingService.GetCustomFieldsList(this.moduleName, this.subModuleName, null, this.displayCode).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.configurationsettingService.customFieldsList.data;
        this.customCompnentValues.forEach(s => {
          this.containers[0].widgets.push(s);
        })
        // console.log('CustomCompnentValues', this.customCompnentValues)
      }
    });
  }

  containers: Array<Container> = [
    new Container(1, 'Select Fields', []),
    new Container(2, 'Added Fields ', []),

  ];

  model: any = {};
  widgets: Array<Widget> = [];

  OnAddedFieldsSubmit() {

    if (this.formName.toString() === "" || this.containers[1].widgets.length == 0) {


      this.SaveLayoutvalidation = true;
      return;
    }
    this.model.data = this.containers[1].widgets;
    this.model.Formname = this.formName.toString();
    this.model.ModuleId = this.moduleId;
    this.model.SubModuleId = this.subModuleId;
    this.model.ClassType = this.classType.toString();
    this.model.FormMasterId = this.object.value.FormId;
    this.configurationsettingService.AddStageForm(this.model).subscribe((result: any) => {

      if (result.statusCode == 200) {


        // console.log('ID', result.id + '-' + this.formName+'-');
        if (result.id != null) {

          this.stageformName = this.formName;
          this.showFormName = true;


          this.object.patchValue({
            'showFormName': this.formName,
            'FormId': result.id
          })
          // console.log('ID', result.id + '-' + this.object.value.showFormName + '-');

          this.containers[0].widgets = [];
          this.containers[1].widgets = [];
        }
        this.toaster.success(result.responseMessage);
        setTimeout(() => { this.loadSave = false; }, 1000);
        this.addFormModal.hide();

      }
      else {
        this.loadSave = false;
        this.toaster.error(result.responseMessage);
      }

    }, error => {
      this.loadSave = false;
    });
  }
  checkFormArray()
  {
    this.fields.controls.forEach(x=>{
      (x as FormGroup).get('stagename').updateValueAndValidity()
    })
  }
  checkIfUnique(index) {
    ;
    return (control: FormControl) => {
      //try get the form array
      //control.parent is the FormGroup, control.parent.parent is the formArray
      const formArray =
        control.parent && control.parent.parent
          ? (control.parent.parent as FormArray)
          : null;
      if (formArray && formArray.controls.length) {
        let dIndex= -1;
        const start = formArray.controls.length - 1;
        for (let i = start; i >= 0; i--) {
          for (let j = i; j >= 0; j--) {
            if (i != j) {
              if (

                formArray.controls[i].value.stagename == formArray.controls[j].value.stagename &&
                (formArray.controls[j].value.stagename == control.value )
              ) {
                dIndex = dIndex < i ? i : dIndex ;
              }
            }
          }
        }
        if (dIndex > 0 )
        return { isdublicated: true };
      }
    };
    
  }
  toggleClassRadioButtonNew(event: any, classs: string) {
    if (classs === 'double') {
      this.classType = 'col-lg-6 col-md-6';
    }
    else if (classs === 'triple') {
      this.classType = 'col-lg-4 col-md-4';

    }
    else {
      this.classType = 'col-lg-3 col-md-3';


    }
    this.hidemeNewGrp = false;

  }
  dynamicLayoutNewSection: any;
  hidemeNewGrp: boolean = false;
  classType: string = 'col-lg-6 col-md-6';
  OnDropSuccess() {
    this.StopDragEnabled = !(this.containers[1].widgets.length === 30);
  }

  OnDropSuccessReverese() {
    this.StopDragEnabled = !(this.containers[1].widgets.length === 30);
  }

  OnFormNameChanged() {
    if (this.SaveLayoutvalidation == false) {
      return this.formName === "";
    }
  }
  restMasterddl() {

  }
}

class Container {
  constructor(public id: number, public name: string, public widgets: Array<any>) { }
}

class Widget {
  constructor(public name: string) { }
}




