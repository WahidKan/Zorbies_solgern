import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormGroupName } from '@angular/forms';
import { AnyARecord } from 'dns';
import { ToastrService } from 'ngx-toastr';
import { forEach } from 'underscore';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { MasterValuesService } from '../master-values.service';

@Component({
  selector: 'app-add-edit-master-values',
  templateUrl: './add-edit-master-values.component.html',
  styleUrls: ['./add-edit-master-values.component.scss']
})
export class AddEditMasterValuesComponent implements OnInit {

  pageTitle: string;
  contentHeader: object;
  loadSave: boolean = false;
  form: FormGroup;
  sectionDrag: boolean = true;
  lstModule: any[] = [];
  lstSubModule: any[] = [];
  lstCustomField: any[] = [];
  colorCode: any[] = [];
  isDuplicate: boolean = false;
  duplicateIndex: number;
  nonCustomDDL : boolean = false;
  constructor(private _commonService: CommonService, private _service: MasterValuesService, private toaster: ToastrService, private dialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.loadSave = true;
    this.pageTitle = "Manage Master Values";
    this.initBreadCrumb();
    this.form = this._service.buildForm();
    this.getModuleList();
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: this.pageTitle,
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
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
  }
  getModuleList() {
    this._service.getModuleList().subscribe((result: any) => {
      this.lstModule = result;
      this.loadSave = false;
    })
  }
  onModuleChange(event) {
    
    this.subModuleId.reset();
    this.lstSubModule = null;
    this.controlId.reset();
    this.lstCustomField = null;
    this.fieldValues.clear();
    if (event) {
      
      this._commonService.getMasterSubModuleList(this.moduleId.value, "master_value_sub_modules_layout").subscribe((result: any) => {
        this.lstSubModule = this._commonService.masters;
      });
    }
  }
  onSubModuleChange(event) {
    this.controlId.reset();
    this.lstCustomField = null;
    this.fieldValues.clear();
    if (event) {
      if(event.text == 'Manage Role' || event.text == 'Manage User'){
        this.lstCustomField = [{display_name : "User Type", custom_field_id : -10,is_system_generated : 0,ref_table : null,field_code : null, module_id : this.moduleId.value ,sub_module_id : this.subModuleId.value }]; 
        this.nonCustomDDL = true;
      }else{
        this.nonCustomDDL = false;
        this._service.getSelectTypeCustomFields(this.moduleId.value, this.subModuleId.value).subscribe((result: any) => {
          this.lstCustomField = result;
        });
      }
    }
  }
  onCustomFieldChange(event) {
    this.fieldValues.clear();
    if (event) {
      this._service.getDDLValues(this.moduleId.value, this.subModuleId.value, this.controlId.value).subscribe((result: any) => {
        ;
        if (result) {
          this.loadSave = false;
          // console.log("GetValuesDLL result", result);
          if (result.masterEntry != null) {
            //   this.moduleId = result.statusSingleModels[0].moduleId;
            //   this.subModuleId = result.statusSingleModels[0].subMouldeId;
            //   this.mastersId = result.statusSingleModels[0].masterId;
            
            
          }
          if(result.fieldValues){
            if (result.fieldValues.length > 0) {
              this.mastersId.setValue(result.fieldValues[0].masterId);
              
              result.fieldValues.forEach(m => {
                if(this.nonCustomDDL && ( m.value == 'Sales' || m.value == 'Marketing' || m.value == 'Installer' || m.value == 'Installer'
                || m.value == 'Site Survey' || m.value == 'Field Service'|| m.value == 'Management'|| m.value == 'Inside Sales'|| m.value == 'Inventory' 
                || m.value == 'Proposal Design'|| m.value == 'Permitting'|| m.value == 'Scheduling'|| m.value == 'Account Management'|| m.value == 'Engineering'|| m.value == 'Interconnection'
                || m.value == 'Company Administrator')){
                  m.isSystemGenerated = true;
                }
                let index: number = this.fieldValues.length;
                this.fieldValues.push(this._service.buildValuesForm(index, m));
              });
            } else {
              let index: number = this.fieldValues.length;
              this.fieldValues.push(this._service.buildValuesForm(index, null));
            }
          }
        }
      });
    }
  }
  checkFormArray()
  {
    this.fieldValues.controls.forEach(x=>{
      (x as FormGroup).get('value').updateValueAndValidity()
    })
  }
  addMoreFieldValue() {
    let index: number = this.fieldValues.length;
    var group : FormGroup = this._service.buildValuesForm(index, null);
    group.get('value').markAsTouched();
    this.fieldValues.push(group);
  }
  removeFieldValue(index) {
    const message = `Are you sure you want to delete the value?`;
    this.dialogService.confirm('DELETE VALUE', message).subscribe((confirmed) => {
      if (confirmed) {
        this.fieldValues.removeAt(index);
        this.toaster.success(`Value has been deleted successfully.`);
        this.checkFormArray();
      }
    });
  }
  onColorPickerClick(index, item: FormGroup, event) {
    let data = this.S4();
    let rendomdata = data;
    rendomdata = this.fieldValues.value[index].choosenColor;
    this.colorCode[index] = null;
    this.colorCode[index] = rendomdata;
  }
  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  get moduleId() {
    return this.form.get('moduleId');
  }
  get subModuleId() {
    return this.form.get('subModuleId');
  }
  get controlId() {
    return this.form.get('controlId');
  }
  get mastersId() {
    return this.form.get('mastersId');
  }
  get fieldValues() {
    return (this.form.get('fieldValues') as FormArray);
  }
  onSubmit() {
    if (this.form.valid) {
      for (var i =0;i<this.fieldValues.controls.length;i++)
      {
        this.fieldValues.controls[i].value.displayOrder=i+1;
      }
      this.loadSave = true;
      // console.log("submit form", this.form.value);
      this._service.addEditForm(this.form.value).subscribe((response: any) => {
        this.loadSave = false;
        if (response.statusCode == 200) {
          this.toaster.success(response.responseMessage);
          // this.fieldValues.clear();
          // this.form.reset();
        } else {
          this.toaster.success(response.responseMessage);
        }
      });
    }
  }
  checkDuplicateName(event, index) {
    if (event) {
      this.fieldValues.controls.forEach((element, i) => {
        if (event.target.value === element.value.value) {
          this.fieldValues.controls[index].setErrors({ duplicated: true });
        }
        else {
          this.fieldValues.controls[index].setErrors({ duplicated: true });
        }
      });
    }
  }

  close() {

  }
}
