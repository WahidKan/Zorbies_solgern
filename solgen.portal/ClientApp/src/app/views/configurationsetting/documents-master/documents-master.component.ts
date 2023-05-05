import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ManageStatusModel, ConfigurationsettingService, Guarantor } from '../configurationsetting.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents-master',
  templateUrl: './documents-master.component.html',
  styleUrls: ['./documents-master.component.scss']
})
export class DocumentsMasterComponent implements OnInit {

  loadSave = false;
  configurationSetings: FormGroup;
  colorCode: any[] = [];
  manageStatusModel: ManageStatusModel = new ManageStatusModel();

  field: any;
  indx: any;
  lstSystemGenerated: any[] = [];

  moduleId: any;
  subModuleId: any;
  mastersId: any;

  constructor(private fb: FormBuilder,
    private configurationsettingService: ConfigurationsettingService,
    private toaster: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.SetStatusData();
  }
  Cancel() {

  }
  addmoreStatus() {
    const control = <FormArray>this.configurationSetings.controls['addmoreFields'];
    control.push(this.appendInitForm());
  }

  removeConfiguration(i: number) {
    // remove guarantor from the list

    const control = <FormArray>this.configurationSetings.controls['addmoreFields'];
    control.removeAt(i);
  }

  appendInitForm() {
    return this.fb.group({
      status: [''],
      description: [''],
      chooseColor: [''],
      masterId: ['']
    });
  }

  SetColorFor(i: any, event: any) {
    let data = this.S4();
    let rendomdata = data;
    rendomdata = this.configurationSetings.value.addmoreFields[i].chooseColor;
    this.colorCode[i] = rendomdata;
  }

  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  SetStatusData() {
    this.field = event;

    this.indx = 0; //CLDC [91120]
    this.lstSystemGenerated = ['']; //CLDC [91120]
    // this.initdisplayStatusForm();
    //
    this.configurationsettingService.GetDocumentsFromMaster().subscribe((result: any) => {
      if (result) {
        this.initForm();
        this.loadSave = false;
        this.configurationSetings.patchValue({

        });
        if (result.statusSingleModels[0] != null) {
          this.moduleId = result.statusSingleModels[0].moduleId;
          this.subModuleId = result.statusSingleModels[0].subMouldeId;
          this.mastersId = result.statusSingleModels[0].masterId;
          this.field = result.statusSingleModels[0].controls;

          result.addmoreFields.forEach(m => {
            this.addmoreFields.push(this.initdisplayStatusForm(m));
            this.lstSystemGenerated[this.indx] = m.isSystemGenerated; //CLDC [91120]
            // console.log('this.lstSystemGenerated', this.lstSystemGenerated); //CLDC [91120]
            this.indx = this.indx + 1;
          });
          this.addmoreFields.removeAt(0);
        }
        if (result.statusSingleModels[0] == null) {
          this.initForm();
        }
      }
    });
  }

  private initForm() {
    this.configurationSetings = this.fb.group({
      //alert("a");
      addmoreFields: this.fb.array([
        this.appendInitForm(),
      ]),
    });
  }

  initdisplayStatusForm(gurantor: Guarantor) {
    return this.fb.group({
      status: [gurantor.status],
      description: [gurantor.description],
      chooseColor: [gurantor.chooseColor],
      masterId: [gurantor.masterId],
      colorCode: [gurantor.chooseColor]
    });
  }

  AddConfigurationStatus() {
    this.manageStatusModel.moduleId = null;
    this.manageStatusModel.subModuleId = null;
    this.manageStatusModel.controls = null;
    this.manageStatusModel.masterId = this.mastersId;
    this.manageStatusModel.fieldsData = JSON.stringify(this.configurationSetings.value.addmoreFields);
    this.configurationsettingService.AddUpdateDocumentsMaster(this.manageStatusModel).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        //  window.location.href = "/configurationsetting";
        this.router.navigateByUrl("/configurationsetting");
        //this.SetStatusData(this.field);
        setTimeout(() => { this.loadSave = false; }, 3000);
      }
      else {
        this.loadSave = false;
        this.toaster.error(result.responseMessage);
      }
    }, error => {
      this.loadSave = false;
    });
  }
 
  get addmoreFields(): FormArray {
    return <FormArray>this.configurationSetings.get('addmoreFields');
  }
  get status() { return this.configurationSetings.get('status'); }
  get description() { return this.configurationSetings.get('description'); }
  get chooseColor() { return this.configurationSetings.get('chooseColor'); }
  get masterId() { return this.configurationSetings.get('masterId'); }
}
