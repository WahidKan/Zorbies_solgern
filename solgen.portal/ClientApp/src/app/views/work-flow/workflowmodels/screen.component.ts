import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { RuleEngineService } from '../../rule-engine/rule-engine.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CheckboxData } from '../../department/department.service';
import { WorkflowService } from '../workflow.service';
import { WelcomescreenaddComponent } from '../../shared/welcomescreen/welcomescreenadd.component';
import { WelcomescreenComponent } from '../../shared/welcomescreen/welcomescreen.component';
import { FormService } from '../../manageform/form.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
  @Input() offset: number;
  @ViewChild('screenadd', { static: false }) screenadd: WelcomescreenaddComponent;
  @ViewChild('welcomecomponent', { static: false }) welcomecomponent: WelcomescreenComponent;
  SelectedValue: any[] = [];
  @Input() ruleEngineForm: FormGroup;
  @Input() target: FormGroup;
  @Input() rowNo: number;
  @Input() typescreen: boolean;
  @Input() productId: string;
  // @Input() resulttype: string;
  @Output() buttonState = new EventEmitter();
  @Output() stepdll = new EventEmitter<number>();
  @Output() getIndexNo = new EventEmitter<{ rowno: number, type: string }>();   
  @Output() showbutton = new EventEmitter<number>();
  screendata: any;
  targetForm: FormGroup;
  screenname: string = '';
  formControlList: any[] = [];
  form: FormGroup;
  formGroup: FormGroup;
  checkboxdata1: Array<CheckboxData> = [];
  sortDir = 'desc';
  sortColumn = 'created_date';
  pagedData: any = {
    pager: {},
    data: []
  };
  datalentgh: number;
  currentPage: number = 1;
  pageSizeValue: number = 10;
  screencount: number = 0;
  screenName: '';
  screenid: '';
  SavedScrrenId: string;
  screenIdNotShow: any[] = [];
  editpopup: boolean = false;
  submoduleid: any;
  moduleid: any;   
  modulelist: any;
  isDecision: boolean = false;
  @ViewChild('screenmodel', { static: false}) screenmodel: ModalDirective;
  @ViewChild('screenListmodel', { static: false }) screenListmodel: ModalDirective;  

  constructor(private ruleEngineService: WorkflowService, private fb: FormBuilder, private router: Router,
    private toaster: ToastrService, private dialogService: ConfirmationDialogService, private route: ActivatedRoute, private commonService: CommonService, private formService: FormService) { }
  ngOnChanges(): void {

    this.initForm();
    if ((this.target.get('isScreenAdded').value) || ((this.target.get('isDecisionScreenAdded').value) && this.target.get('isDecisionAdded').value)) {
      this.prepareEditScreenForm();
    }
  }
  ngOnInit() {
    this.editpopup = false;
    //this.GetScreenFormsList();
  }
  //getScreenFormField() {
  //  this.ruleEngineService.getScreenFormField(4, 11, 0).subscribe((result: any) => {
  //    this.screendata = result;
  //    // console.log('screendata', this.screendata);
  //  })
  //}
  initForm() {

    this.targetForm = this.ruleEngineService.buildTarget(null, 'screen');
    this.getModuleddl();

  }
  getModuleddl() {  
    this.formService.getModuleList().subscribe((result: any) => {
      if (result) {
        // console.log('result', result);;
        let _result = JSON.parse(result);
        this.modulelist = _result.module;
        // console.log('this.modulelist', this.modulelist);
     
      }
    });
  }
  getScreenFormField(row: any) {

    this.ruleEngineService.getScreenFormField(this.moduleid, this.submoduleid, row.form_master_id).subscribe((result: any) => {
      // console.log('result', result);
      this.screenid = row.form_master_id;
      this.screenName = row.name;

      if (result != null) {

        this.screendata = result.data;
        // console.log('screendata', this.screendata);
        this.screenListmodel.hide();
        this.screenmodel.show();

        this.screenname = this.screendata[0].name;

        // console.log('screenname', this.screenname);
        const group: any = {};
        data_type_name: Text

        this.screendata.forEach(cnt => {
          let val = null;
          if (cnt.field_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          } else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.field_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => {
                //// console.log(item.controlname, item.controlvalues);
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }

          // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.field_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.field_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.field_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])

        });
        this.form = new FormGroup(group);
      }
      else {
        alert('this screen have no fields')
      }
      //// console.log("validationFROM", this.form);
      //this.loadSave = false;
    })

  }
  getId() {
    const control = this.ruleEngineForm.get('targets') as FormArray;
    control.controls.forEach(m => {
      if (m.value['ScreenId'] != '' && m.value['ScreenId'] != 0 && m.value['ScreenId'] != undefined)
        this.screenIdNotShow.push({ Id: m.value['ScreenId']})
      // alert(m.controls['ScreenId'].value);
     
    })
    
  }

  //GetScreenFormsList() {
  //  this.getId();
  //  let usedSreenid: string;
  //  usedSreenid = this.screenIdNotShow.map(x => x.Id).join(",");
  //  //alert(this.ruleEngineForm.value.SubModuleId);
  // //// console.log('ruleEngineFormruleEngineFormruleEngineFormruleEngineForm', this.ruleEngineForm.value.moduleId);
  //  this.submoduleid = this.ruleEngineForm.value.subModuleId.sub_module_id;
  //  this.moduleid = this.ruleEngineForm.value.moduleId.value;
  //  this.ruleEngineService.GetScreenFormsList('', this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.submoduleid, usedSreenid).subscribe((result: any) => {
  //    this.pagedData = this.ruleEngineService.pagedData;
  //    // console.log('pagedData', this.pagedData)
  //    this.datalentgh = this.pagedData.data.length;
  //    this.screencount = this.ruleEngineService.pagedData.pager.totalItems;
  //    this.offset = this.currentPage;
  //  })

  //}
  setPage($event) {
   this.currentPage = $event.page;
   //this.GetScreenFormsList();
   // this.currentPageNotes = $event.page;
  }
  //onSort($event) {
  //  const sort = $event.sorts[0]
  //  this.sortDir = sort.dir;
  //  this.sortColumn = sort.prop;
  //  this.currentPage = 1;
  //  //this.loadSave = true;
  //  this.GetScreenFormsList();
  //}

  //setPageNo($event) {
  //  this.currentPage = $event.page;
  //  this.GetScreenFormsList();
  //}
  hidescreenListmodel() {
   this.screenListmodel.hide();
   this.targetForm.get('addButton').setValue(false);
  }

  hidescreenmodel() {
    this.screenmodel.hide();
  } 
  //}
  //AddScreen() {
  //  this.editpopup = false;
  //  this.screenListmodel.show();
  //}
  get conditions() {

    return this.targetForm.get('conditions') as FormArray;
  }
  TargetConditions(index: number) {
    return (this.ruleEngineForm.get('targets') as FormArray).at(index).get('conditions') as FormArray;
  }
  saveScreen() {
    if (!this.isDecision) {
      this.targetForm.get('isScreenAdded').setValue(true);
      this.targetForm.get('ScreenId').setValue(this.screenid);
      this.targetForm.get('type').setValue('Screen');
      //this.targetForm.get('ScreenName').setValue(this.screenName);
      this.targetForm.get('isResultAdded').setValue(true);
      this.targetForm.get('isConditionAdded').setValue(false);
      // this.resulttype = 'Screen';

      this.buttonState.emit();
      (this.ruleEngineForm.get('targets') as FormArray).at(this.rowNo).patchValue({
        ScreenId: this.targetForm.value.ScreenId,
        isScreenAdded: this.targetForm.value.isScreenAdded,
        type: this.targetForm.value.type,
        targetId: this.targetForm.value.targetId,
        isConditionAdded: this.targetForm.value.isConditionAdded,
        targetCondition: this.targetForm.value.targetCondition,
        isResultAdded: this.targetForm.value.isResultAdded,
        ScreenName: this.targetForm.value.ScreenName,
        results: this.targetForm.value.results


      });
      

    }
    else {
      this.targetForm.get('isScreenAdded').setValue(true);
      this.targetForm.get('ScreenId').setValue(this.screenid);
      //this.targetForm.get('ScreenName').setValue(this.screenName);
      this.targetForm.get('isResultAdded').setValue(true);
      this.targetForm.get('isDecisionScreenAdded').setValue(true);
      this.targetForm.get('isConditionAdded').setValue(false);
      this.showbutton.emit(123456);   


      (this.ruleEngineForm.get('targets') as FormArray).at(this.rowNo).patchValue({
        ScreenId: this.targetForm.value.ScreenId,
        isScreenAdded: this.targetForm.value.isScreenAdded,
        targetId: this.targetForm.value.targetId,
        isConditionAdded: this.targetForm.value.isConditionAdded,
        targetCondition: this.targetForm.value.targetCondition,
        isResultAdded: this.targetForm.value.isResultAdded,
        ScreenName: this.targetForm.value.ScreenName,


      });
    }
    // console.log(this.targetForm.value.targetCondition);

    while (this.TargetConditions(this.rowNo).length != 0) {
      this.TargetConditions(this.rowNo).removeAt(0);
    }
  
    this.conditions.controls.forEach(m => {

      this.TargetConditions(this.rowNo).push(m);
    });
    // console.log('testscreen', (this.ruleEngineForm.get('targets') as FormArray).at(this.rowNo));
   
    //if (!this.isDecision) {
    //  this.stepdll.emit(this.rowNo);
    //}
    this.screenmodel.hide();
    this.screenListmodel.hide();
  }
  get targets() {
    return this.ruleEngineForm.get('targets') as FormArray;
  }
   get results() {
    return this.target.get('results') as FormArray;
  }

  prepareEditScreenForm() {
    let editTargetForm = this.targets.at(this.rowNo) as FormGroup;
    // console.log('editTargetFormscreen: ', editTargetForm);
    this.screenname = editTargetForm.value.ScreenName;
    this.screenid = editTargetForm.value.ScreenId;
    this.targetForm.patchValue({
      type: editTargetForm.value.type,
      ScreenId: editTargetForm.value.ScreenId,
      isScreenAdded: editTargetForm.value.isScreenAdded,
      ScreenName: editTargetForm.value.ScreenName,
      targetId: editTargetForm.value.targetId,
      isConditionAdded: editTargetForm.value.isConditionAdded,
      targetCondition: editTargetForm.value.targetCondition,
      isResultAdded: editTargetForm.value.isResultAdded,
      isDecisionScreenAdded: editTargetForm.value.isDecisionScreenAdded,
      //results: editTargetForm.value.results
    }); 

  }

  deletetarget(id:any) {
    const message = `Are you sure you want to delete this screen?`;
    this.dialogService.confirm('Delete Screen', message).subscribe(confirmed => {
      if (confirmed) {
        let submodulecode = this.ruleEngineForm.value.subModuleId.module_name_code;
        this.moduleid = this.ruleEngineForm.value.moduleId.value;
        // let submodulecode = this.ruleEngineForm.value.subModuleId.module_name_code;
        let modulecode = (this.modulelist.filter(m => m.module_id == this.moduleid)[0].module_code as string).toLowerCase();
        this.targets.removeAt(this.rowNo);
        this.formService.deleteForm(modulecode, submodulecode, id).subscribe(result => {
          this.toaster.success(`Screen has been deleted successfully.`);

        })
      }
          

      
    });

  }
  openeditpopup(id: any) {
    //alert(id);
    //this.editpopup = true;

    this.submoduleid = this.ruleEngineForm.value.subModuleId.sub_module_id;
    let submodulecode = this.ruleEngineForm.value.subModuleId.module_name_code;
    this.moduleid = this.ruleEngineForm.value.moduleId.value;
    let modulecode = (this.modulelist.filter(m => m.module_id == this.moduleid)[0].module_code as string).toLowerCase();
    // console.log('submodulecode', submodulecode);
    // console.log('modulecode', modulecode);
    this.welcomecomponent.show(modulecode, submodulecode, id);

    //this.ruleEngineService.getScreenFormField(this.moduleid, this.submoduleid, id).subscribe((result: any) => {
    //  // console.log('result', result);


    //  if (result != null) {

    //    this.screendata = result.data;
    //    // console.log('screendata', this.screendata);
    //    this.screenListmodel.hide();
    //    this.screenmodel.show();

    //    this.screenname = this.screendata[0].name;

    //    // console.log('screenname', this.screenname);
    //    const group: any = {};
    //    data_type_name: Text
   
    //    this.screendata.forEach(cnt => {
    //      let val = null;
    //      if (cnt.field_type == 'bit') {
    //        val = cnt.value == 1 ? true : false;
    //      } else {
    //        val = (cnt.value == '' ? null : cnt.value);
    //      }
    //      this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
    //      if (cnt.field_type == 'checkbox') {
    //        try {
    //          this.checkboxdata1.forEach((item) => {
    //            //// console.log(item.controlname, item.controlvalues);
    //            this.form.get(item.controlname).setValue(item.controlvalues.split(','));
    //          });
    //        }
    //        catch (err) { }
    //      }

    //      // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
    //      group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
    //      cnt.field_type == "int" ? Validators.pattern("[0-9]{1,9}") :
    //        cnt.field_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
    //          cnt.field_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
    //            Validators.nullValidator
    //      ])

    //    });
    //    this.form = new FormGroup(group);
    //  }
    //  else {
    //    alert('this screen have no fields')
    //  }
    //})



  }

  addNewScreen(dec: boolean) {
    ;
    this.isDecision = dec;
    this.submoduleid = this.ruleEngineForm.value.subModuleId.sub_module_id;
   // let submodulecode = this.ruleEngineForm.value.subModuleId.module_name_code;
    this.moduleid = this.ruleEngineForm.value.moduleId.value;
    //let modulecode = (this.modulelist.filter(m => m.module_id == this.moduleid)[0].module_code as string).toLowerCase();

    
    this.screenadd.showpopup(this.moduleid, this.submoduleid );
    this.screenListmodel.hide();
  }
  getformid(id: any) {
  
    this.screenid = id;
    this.saveScreen();
  }
  getformname(name: any) {  
    this.targetForm.get('ScreenName').setValue(name);  
    //this.screenname = name;
  }
  deletetargetDecision(id: any) {
    ;
    const message = `Are you sure you want to delete this screen?`;
    this.dialogService.confirm('Delete Screen', message).subscribe(confirmed => {
      if (confirmed) {
        let submodulecode = this.ruleEngineForm.value.subModuleId.module_name_code;
        this.moduleid = this.ruleEngineForm.value.moduleId.value;
        // let submodulecode = this.ruleEngineForm.value.subModuleId.module_name_code;
        // console.log()
        let modulecode = (this.modulelist.filter(m => m.module_id == this.moduleid)[0].module_code as string).toLowerCase();
        this.targetForm.get('isScreenAdded').setValue(false);
        this.targetForm.get('ScreenId').setValue(0);
        this.targetForm.get('isDecisionScreenAdded').setValue(false);



        (this.ruleEngineForm.get('targets') as FormArray).at(this.rowNo).patchValue({
          ScreenId: this.targetForm.value.ScreenId,
          isScreenAdded: this.targetForm.value.isScreenAdded,

          ScreenName: this.targetForm.value.ScreenName,


        });
        this.showbutton.emit(this.rowNo);
        this.formService.deleteForm(modulecode, submodulecode, id).subscribe(result => {
          this.toaster.success(`Screen has been deleted successfully.`);

        })
      }



    });
   
  }
}
