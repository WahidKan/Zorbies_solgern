import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { FormService, GroupAddForm } from '../../manageform/form.service';
import { WelcomescreenComponent } from './welcomescreen.component';

@Component({
  selector: 'app-welcomescreenadd',
  templateUrl: './welcomescreenadd.component.html',
  styleUrls: ['./welcomescreenadd.component.scss']
})
export class WelcomescreenaddComponent implements OnInit {
  @ViewChild('makeForm', { static: false }) makeFormModel: ModalDirective;
  @ViewChild('welcomecomponent', { static: false }) welcomecomponent: WelcomescreenComponent;
  @Output() getformid = new EventEmitter<string>();    
  @Output() getformname = new EventEmitter<string>();    

  SubModuleForm: GroupAddForm = new GroupAddForm();
  modulelist: any;
  subModulelist: any;
  ddlModulelist: any[] = [];
  ddlSubModulelist: any[] = [];
  loginuserid: any;
  addForm: FormGroup;  
  companyid: any;
  modulecode: any;
  submodulecode: any;
  formname: string = '';
  loadSave: boolean = false;
  constructor(private fb: FormBuilder,
    private formservice: FormService,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.initform();
  }
  //addForm = this.fb.group({
  //  moduleName: [null, Validators.required],
  //  ddlModule: [null, Validators.required],
  //  ddlSubmodule: [null, Validators.required],
  //  Id: [null]
  //})
  private initform() {
    this.addForm = this.fb.group({
      moduleName: [null, Validators.required],
      ddlModule: [null, Validators.required],
      ddlSubmodule: [null, Validators.required],
      Id: [null]
    })
  }
 
  getModuleddl() {
    this.formservice.getModuleList().subscribe((result: any) => {
      if (result) {
        let _result = JSON.parse(result);
        this.modulelist = _result.module;
        // console.log('this.modulelist', this.modulelist);
        this.ddlModulelist = _result.module;
      }
    });
  }
  showpopup(moduleid:any,submoduleid:any) {
    ;
    this.initform();
    this.addForm.reset();
    this.getModuleddl()
    this.GetEditSubModule(moduleid);
    moduleid = parseInt(moduleid);
    this.addForm.patchValue({
      ddlSubmodule: submoduleid,
      ddlModule: moduleid,

    });
    this.addForm.get('ddlSubmodule').disable();
    this.addForm.get('ddlModule').disable();
    this.makeFormModel.show();
  }
  GetEditSubModule(moduleId) {
    if (moduleId) {
      this.formservice.getSubModuleListByModuleId(moduleId).subscribe((result: any) => {
        if (result) {
          let _result = JSON.parse(result);
          this.ddlSubModulelist = _result.submodule;
        }
      });
    }
  }
  close() {
    this.makeFormModel.hide();
  }
  getSubmodulesByModuleId(event) {
    if (event) {
      let moduleId = event.module_id;
      if (moduleId) {
        this.formservice.getSubModuleListByModuleId(moduleId).subscribe((result: any) => {
          if (result) {
            let _result = JSON.parse(result);
            this.ddlSubModulelist = _result.submodule;
          }
        });
      }
    }
    else {
      this.ddlSubModulelist = null;
      this.ddlSubmodule.setValue(null);
    }
  }
  get moduleName() { return this.addForm.get('moduleName'); }
  get ddlModule() { return this.addForm.get('ddlModule'); }
  get ddlSubmodule() { return this.addForm.get('ddlSubmodule'); }
  get Id() { return this.addForm.get('Id'); }  
  saveNewForm() {
    // console.log('addformvalue.',this.addForm.value)
    if (this.addForm.valid) {
      this.formname = this.addForm.value.moduleName;
      let modulecode = (this.ddlModulelist.filter(m => m.module_id == this.ddlModule.value)[0].module_code as string).toLowerCase();
      let submodulecode = (this.ddlSubModulelist.filter(m => m.sub_module_id == this.ddlSubmodule.value)[0].sub_module_code as string).toLowerCase();
      this.modulecode = modulecode;
      this.submodulecode = submodulecode;
      this.SubModuleForm.moduleName = this.addForm.value.moduleName;
      this.SubModuleForm.moduleId = this.ddlModule.value;
      this.SubModuleForm.subModuleId = this.ddlSubmodule.value;   
      this.SubModuleForm.Id = this.addForm.value.Id;
      
      this.formservice.saveNewSubModule(this.SubModuleForm, this.loginuserid, this.companyid).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success('Screen has been added successfully');
          this.makeFormModel.hide();
          this.getformname.emit(this.formname);
          
          this.getformid.emit(result.id);  
          
          this.welcomecomponent.show(this.modulecode, this.submodulecode, result.id)
         // this.router.navigate(['/manageform/editform', modulecode, submodulecode, result.id]);
        }
        else if (result.statusCode == 300) {
          this.toaster.success(result.responseMessage);
          this.makeFormModel.hide();
         // this.refresh();
          //this.router.navigate(['/manageform/editform', modulecode, submodulecode, result.id]);
        }
        else if (result.statusCode == 500 && result.id == -1) {
          this.toaster.error("Screen is already exists with same name. Please enter another name for this screen.");
        }
        else if (result.statusCode == 500 && result.id == -2) {
          this.toaster.error("Can not be same name as system predefine");
        }
        else {

          this.toaster.error(result.responseMessage);
        }
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
    }
  }
  
}
