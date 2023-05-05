import { Component, OnInit, ViewChild } from '@angular/core';
//import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService, ModuleList } from '../shared/common.service';
import { ConfigurationsettingService, SubstageModel, substage, stagepagelinks, savesubstageModel } from './configurationsetting.service';
import { StageinfoComponent } from '../loanapplication/stageinfo/stageinfo.component';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-stageconfig',
  templateUrl: './stageconfig.component.html',
  styleUrls: ['./stageconfig.component.scss']
})
export class StageconfigComponent implements OnInit {
  @ViewChild('stageInfo', { static: false }) stageInfo: StageinfoComponent;
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  lstUserType: any;
  sustagelist: any;
  lstpage: any;
  lstpagearray: stagepagelinks[] = [];
  stageform: FormGroup;
  selectedTexts: any[] = [];
  selectedPages: any[] = [];
  selectedNotVisible: any[] = [];
  selectedPagesmaster: any[] = [];
  fieldmodel: any[] = [];
  count: boolean = true;
  stagemodel: SubstageModel = new SubstageModel();
  substage: substage = new substage();
  savesubstageModel: savesubstageModel = new savesubstageModel();
  index: number = -1;
  IsDetail = true;

  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;

  sortDir = 'desc';
  sortColumn = 'BatchId';
  pagedData: any = {
    pager: {},
    data: []
  };
  moduleId: any;
  subModuleId: any;
  lstsubModule: any;
  loadSave: boolean = false;
  lstPageSize: any
  pageSizeValue: number;
  lstModule: any;
  batchid: number = 0;
  showstage: boolean = false;
  isFinancial: boolean = false;
  isStateManagement: boolean = false;
  constructor(private fb: FormBuilder, private configurationsettingService: ConfigurationsettingService, private router: Router, private dialogService: ConfirmationDialogService,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {
    this.commonService.getMasterItemsList("solgen_usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;

    })
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      debugger;
     // // console.log('userdetail', userdetail);
      if (userdetail.companyType === 'companytypeFinancialInstitute' || userdetail.companyType === 'companytypeCRMLoanInstall') {
        this.isFinancial = true;
        if (this.isFinancial == true) {
          this.showstage = true;
        }
      }
    });
    this.commonService.getMasterItemsList("custom_modules").subscribe((result: any) => {
      this.lstModule = this.commonService.masters;
      //// console.log('lstModule', this.lstModule);
      //// console.log('isFinancial', this.isFinancial);

     

      this.lstModule.filter(x => {
       
        if (this.isFinancial) {
          if (x.name.toLowerCase() == "finance") {
            this.moduleId = x.value;
            this.SetSubmoduleValue(this.moduleId);
            //// console.log('moduleId', this.moduleId);
          }
        }
         
    });

      
  
    })
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
  }

  ngOnInit() {
    this.initForm();
    // this.loadSave = true;
  
    this.pageSizeValue = 10;
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
      //// console.log('.moduleId',this.moduleId)
      //// console.log('.subModuleId ', this.subModuleId )
    }
    //else {   
    //  this.fillform(this.batchid);
      
     
    //  this.IsDetail = true;
    //}
   

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


        // // console.log('result0000', result);

        if (result.length == 0) {
          result = [];
        }
        else {

          currentContext.stageform.patchValue({
            sequence_mandatory: result[0].sequence_mandatory
          })
          if (this.moduleId != result[0].moduleid) {
            this.moduleId = result[0].moduleid.toString();

            this.SetSubmoduleValue(this.moduleId);
            this.subModuleId = result[0].submoduleid.toString();
          }

        }
      let arr = [];
      arr = result;



      if (result.length > 0) {
        currentContext.fields.removeAt(0);
      }

      arr.forEach((x, i) => {

        let objlist = new stagepagelinks();
        x.pages.split(',').forEach((item) => {
          objlist = new stagepagelinks();
          objlist.id = i;
          objlist.values = item;
          currentContext.lstpagearray.push(objlist);
        });



        x.usertype = x.usertype.split`,`.map(x => +x)
        result.usertype = x.usertype.map(function (value) {
          return String(value);
        });

        //// console.log('x.notVisibleForUserType', x.notVisibleForUserType);

        if (x.notVisibleForUserType != null) {

          x.notVisibleForUserType = x.notVisibleForUserType.split`,`.map(x => +x)
          result.notVisibleForUserType = x.notVisibleForUserType.map(function (value) {
            return String(value);
          });
        }
        else {
          result.notVisibleForUserType = [];
        }


        x.pages = x.pages.split`,`.map(x => +x)
        result.pages = x.pages.map(function (value) {
          return String(value);
        });

      
        currentContext.selectedTexts = [];
        currentContext.selectedNotVisible = [];
        currentContext.selectedPages = [];
        currentContext.selectedPagesmaster = [];
        result.usertype.forEach((x) => {
          currentContext.selectedTexts.push(x);
        })
        result.notVisibleForUserType.forEach((x) => {
          currentContext.selectedNotVisible.push(x);
        })
        result.pages.forEach((x) => {
          currentContext.selectedPages.push(x);   
        })
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

            stagename: [x.stagename],
            substageid: [x.substageid],
            duedays: [x.duedays],
            usertype: [currentContext.selectedTexts],
            notVisibleForUserType: [currentContext.selectedNotVisible],
            pages: [currentContext.selectedPages],
            pagesmaster: [currentContext.selectedPagesmaster],
            mandatory: [x.mandatory],
            substages: new FormArray([]),

            //display_order: [x.display_order]
            //index: this.fields.length
          })   
          )
          //// console.log('fields', this.fields);
          if (this.batchid != 0) {
            this.fields.controls.forEach(m => {
              m.get('pages').disable();
              
            });

         
          }
        }
        else {
          
          const control = <FormArray>this.stageform.get('fields');
          const VB = (<FormArray>(control.controls[control.controls.findIndex((item) => item.value.id == x.parentid)].get('substages')));
          VB.push(this.buildFieldsstagesnew(x, currentContext.selectedTexts, currentContext.selectedNotVisible,currentContext.selectedPages, currentContext.selectedPagesmaster));
          
            //this.substagefields.controls.forEach(m => { 
            //  m.get('pagessubstage').disable();
            //});

            
          
        }
        this.loadSave = false;

      });
      });
      this.pagelist(this.moduleId, this.subModuleId);
      this.GetSubStageDll();
      this.pageSizeValue = 10;
      this.getPageSizes();
      this.getusertype();
    }, 2000);
 
  
  }

  checkUserType(e, i) {
    // console.log('hide for ', e)
    // console.log('hide for ', i)

    //if (e.value==)

    let arr = this.fields.controls[i].value.usertype;
    var duplicate = 0
    arr.forEach((x, ind) => {
      if (duplicate == 0) {
        if (this.fields.controls[i].value.notVisibleForUserType.includes(x)) {
          duplicate = x;
        }
      }
    });
    if (duplicate > 0) {
      this.fields.controls[i].get('notVisibleForUserType').setValue(this.fields.controls[i].value.notVisibleForUserType.filter(function (x) { return x != duplicate }));
      this.toaster.error("You have already given Accessibility to '" + e[i].text + "' user types.");
    }


    //const subStages = this.fields.controls[i].get('substages') as FormArray;
    //subStages.controls.forEach((itm, index) => {
    //  itm.get("notVisibleForSubStageUserType").setValue(this.fields.controls[i].value.notVisibleForUserType.filter(function (x) { return x != duplicate }));
    //});
    
  }

  checkAccessibilityUserType(e, i) {

    let arr = this.fields.controls[i].value.notVisibleForUserType;
    var duplicateAccessibilityUser = 0
    arr.forEach((x, ind) => {
      if (duplicateAccessibilityUser == 0) {
        if (this.fields.controls[i].value.usertype.includes(x)) {
          duplicateAccessibilityUser = x;
        }
      }
    });
    if (duplicateAccessibilityUser > 0) {
      this.fields.controls[i].get('usertype').setValue(this.fields.controls[i].value.usertype.filter(function (x) { return x != duplicateAccessibilityUser }));
      this.toaster.error("You have already given Hide For to '" + e[i].text + "' user types.");
    }
  }
  

  clearSelectedSubUserType(e, i, j) {
    //// console.log(' remove sub:', e);

    let val = e.value.value;

    
    const subStages = this.fields.controls[i].get('substages') as FormArray;

    let arr = this.fields.controls[i].value.notVisibleForUserType    ;
    var selectedSubUserUser = 0
    arr.forEach((x, ind) => {
      if (selectedSubUserUser == 0) {

        //// console.log('1125', subStages.controls[j].value.notVisibleForSubStageUserType);
          if(subStages.controls[j].value.notVisibleForSubStageUserType.includes(x)) {
          selectedSubUserUser = x;
        }

      }
    });

   // // console.log('selectedSubUserUser', selectedSubUserUser);

    if (selectedSubUserUser > 0) {
      e.preventDefault();
      this.toaster.error("You have already given Hide For to '" + e[i].text + "' user types.");
    }


    //// console.log('arr', val);
    //// console.log('subarr', arr);
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
    //// console.log('field.value', field.value);
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
      formmasterid: JSON.stringify(pages),
      stageActive: 0,
      stageView: type,
      stageName: type == "sub" ? field.value.substagename : field.value.stagename,
      stageclass: "step-grey",
      userTypes: ""
    };
    this.stageInfo.show(item, false,false);
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

      let objlist = new stagepagelinks();
      x.pages.forEach((item) => {
        objlist = new stagepagelinks();
        objlist.id = i;
        objlist.values = item;
        this.lstpagearray.push(objlist);
      });
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
    if (VB.controls.length >= 4) {
      this.toaster.error("You can not add more than 4 sub stages.");
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
  pagelist(moduleid:any,submoduleid:any) {
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

          let objlist = new stagepagelinks();
          x.pages.forEach((item) => {
            objlist = new stagepagelinks();
            objlist.id = i;
            objlist.values = item;
            this.lstpagearray.push(objlist);
          });
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
  onDropSuccess() {


    this.fields.controls.values
    //forEach((item, i) => item.display_order = i);
  }
  //selcdropdownsubstage(event,i) {
  //  const control = <FormArray>this.stageform.get('fields');
  //  //control.controls.values[i]('substages')
  //  control.value[i].substages[0].pagessubstage = event.value;
  //  //const VB = (control.value[i]('substages'));          
  //}
  addeditstage() {

    // (this.moduleId != null && this.moduleId == undefined && thi)
    //// console.log('stageform:', this.stageform.value)
    
    if (this.stageform.valid) {
      var sequencemandatory = this.stageform.value.sequence_mandatory;
      let data: any[] = [];
      for (var i = 0; i < this.fields.controls.length; i++) {
        //// console.log('stageform:', this.fields.controls[i].value)
        data.push(this.fields.controls[i].value);
        this.fields.controls[i].value.display_order = i;
      }
      
      var stagedata = JSON.stringify(data)

        
      this.savesubstageModel.batchid = this.batchid;
      this.savesubstageModel.stagedata = stagedata
      this.savesubstageModel.sequencemandatory = sequencemandatory;
      this.savesubstageModel.subModuleId = this.subModuleId;
      this.savesubstageModel.moduleId = this.moduleId;

      //// console.log('Save Stage Config:', this.savesubstageModel)

      this.configurationsettingService.savesubstageconfig(this.savesubstageModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.SetSubmoduleValue(this.subModuleId);
          if (this.isStateManagement) {
            this.router.navigateByUrl("/statemanagement");
          }
          
        }
        else {

          this.toaster.error(result.responseMessage);
        }
      }, error => {

      });
    }
    else {
      this.commonService.validateAllFormFields(this.stageform);
    }
  }

  buildFields(): FormGroup {
    this.index = this.index + 1;
    return this.fb.group({
      id: [''],
      stagename: ['', Validators.required],
      substageid: [null, Validators.nullValidator],
      duedays: ['', Validators.nullValidator],
      usertype: [null, Validators.required],
      pages: [null, Validators.required],
      notVisibleForUserType: [null, Validators.nullValidator],
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
      pagessubstage: [null, Validators.required],
      pagessubmaster: [null, Validators.nullValidator],
      issequenceforsubstage: [val, Validators.required],

      notVisibleForSubStageUserType: [null, Validators.nullValidator],

    });
  }
  buildFieldsstagesnew(x: any, selectedTexts: any, selectedNotVisible:any, selectedPages: any, selectedformPages: any): FormGroup {
    let control= this.fb.group({
      id: [x.id],
      substagename: [x.stagename, Validators.required],
      usertypesubstage: [selectedTexts, Validators.required],
      pagessubstage: [ selectedPages , Validators.required],
      pagessubmaster: [selectedformPages, Validators.nullValidator],
      issequenceforsubstage: [(x.issequenceforsubstage), Validators.required],
      notVisibleForSubStageUserType: [selectedNotVisible, Validators.nullValidator],

    });
        if (this.batchid != 0) {
      control.get('pagessubstage').disable();
    }
    return control;
  }

  selcdropdown(e: any, field: any, i: number) {
    //// console.log('4555', e);
    let _length = e.length;
    let flag = true;
    if (_length > 0) {

      this.lstpagearray.forEach((item) => { if (item.id != i && item.values == e[_length - 1].value) { flag = false; return; } });
      if (flag) {
        let linkspages = new stagepagelinks();
        linkspages.id = i;
        linkspages.values = e[_length - 1].value;

        var index1 = this.lstpagearray.findIndex((item) => item.values == e[_length - 1].value);
        if (index1 == -1) {
          this.lstpagearray.push(linkspages);
        }
      }
      else {

        //var valuess = field.value.pages.splice(field.value.pages.indexOf(e[_length - 1].value), 0);
        var index = field.value.pages.indexOf(e[_length - 1].value);

        if (index > -1) {
          //field.value.pages.splice(index, 1);
          let arrvval = field.value.pages.splice(index, 1);
          field.get('pages').setValue(field.value.pages);
        }
        this.toaster.success("This section is already linked.");
      }
    }
    return flag;
  }

  resetlinkpages(e: any, field: any, i: number) {

    var index = this.lstpagearray.findIndex(item => item.values === e.value.value);
    if (index > -1) {
      //field.value.pages.splice(index, 1);
      this.lstpagearray.splice(index, 1);

      var index11 = field.value.pages.indexOf(e.value.value);

      if (index11 > -1) {
        //field.value.pages.splice(index, 1);
        let arrvval = field.value.pages.splice(index, 1);
        field.get('pages').setValue(field.value.pages);
      }

    }

  }
  //GoUP() {

  //  let elemt = this.fields.controls[1];
  //  this.fields.controls[1] = this.fields.controls[0];
  //  this.fields.controls[0] = elemt;
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
  //get substagename() { return this.stageform.get('substagename'); }
  //get usertypesubstage() { return this.stageform.get('usertypesubstage'); }
  //get pagessubstage() { return this.stageform.get('pagessubstage'); }
  get substagename() { return this.stageform.get('substagename'); }
  //get substagename() { return this.stageform.get('fields').get('substages'); }
  get usertypesubstage() { return this.stageform.get('usertypesubstage'); }
  get pagessubstage() { return this.stageform.get('pagessubstage'); }

  get notVisibleForUserType() { return this.stageform.get('notVisibleForUserType'); }
  get notVisibleForSubStageUserType() { return this.stageform.get('notVisibleForSubStageUserType'); }


  /////////////////lOan list start

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  refresh() {

    this.configurationsettingService.getStagesList(this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleId, this.subModuleId).subscribe(response => {

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
    //this.detailTab();    
    this.IsDetail = false;

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
    //this.router.navigateByUrl('loanApplication/' + id);
    this.router.navigate(['loanApplication'], { queryParams: { id: id } });
  }
  cancel() {
    this.batchid = 0;
    this.moduleId = null;
    this.subModuleId = null;
    this.showstage = false;
    this.IsDetail = true;
    this.pagelist(this.moduleId, this.subModuleId);
    this.GetSubStageDll();
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
    //this.fillform(this.batchid, this.moduleId, this.subModuleId);


    
    
 
    this.router.navigateByUrl("/configurationsetting/stageconfig");
  }



  SetSubmoduleValue(event) {

    this.moduleId = event;   
    this.lstsubModule = null;
    this.subModuleId = null;
    this.commonService.getMasterSubModuleList(event, "custom_sub_modules").subscribe((result: any) => {
      this.lstsubModule = this.commonService.masters;
     // // console.log('this.lstsubModule', this.lstsubModule);
  
      this.lstsubModule.filter(x => {
       
        if (this.isFinancial) {
          if (x.name == "loanapplication") {
            this.subModuleId = x.value
           // // console.log('subModuleId', this.subModuleId);
            this.SetStatusValue(this.subModuleId);
          }
          //
        }
      });
      //this.lstsubModule(childObj => {
      //  if (childObj.name == 'loanapplication') {
      //    alert(childObj.value)
      //  }
      //})

    })
  }
  SetStatusValue(event) {
    this.subModuleId = event;
    this.showstage = true;
    this.pagelist(this.moduleId, this.subModuleId);    
    var ab = this.commonService.getQueryStringValue("id");
    if (ab == null) {
      //  this.batchid = parseInt(ab);
      //  this.IsDetail = false;

      //  this.fillform(parseInt(ab), this.moduleId, this.subModuleId);

      //}
      //else {
      this.fillform(this.batchid, this.moduleId, this.subModuleId);
    }
    this.refresh();
      this.IsDetail = true;
//    }



    //// console.log('subModuleId', this.subModuleId) 
   // // console.log('moduleId', this.moduleId)
  }
  calaulate(){  
  setTimeout(() => {
    // this.loadSave = false;
    this.table.recalculate();
    this.table.recalculateColumns();
  }, 200);}
}


