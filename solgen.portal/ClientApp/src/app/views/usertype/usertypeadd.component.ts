import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService, ModuleList } from '../shared/common.service';
import { UsertypeserviceService, UserType } from './usertypeservice.service';

@Component({
  selector: 'app-usertypeadd',
  templateUrl: './usertypeadd.component.html',
  styleUrls: ['./usertypeadd.component.scss']
})
export class UsertypeaddComponent implements OnInit {
  statuses: any;
  isDisabled: any;
  pageTitle: string;
  loading = false;
  statusId: any;
  userTypeForm: FormGroup;
  loadSave = false;
  count: any;
  values: any;
  userTypeModel: UserType = new UserType();
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  modulelist: any;
  submodulelist: any[] = [];
  selected: any[] = [];
  selectedid: any;
  submoduleid: any;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private userTypeService: UsertypeserviceService,
  ) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    this.isDisabled = null;
    this.selected = [];
    this.initForm();
    this.getStatuses();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loading = true;
        this.GetModuleSubmoduleList(id);
        this.fillForm(id);
      } else {
        this.pageTitle = 'Add User Type';
      }
    });
  }


  get userType() { return this.userTypeForm.get('userType'); }
  get userTypeStatusId() { return this.userTypeForm.get('userTypeStatusId'); }
  get checkboxdata() { return this.userTypeForm.get('checkboxdata'); }
  get userTypeDescription() { return this.userTypeForm.get('userTypeDescription'); }

  getStatuses() {
    this.commonService.getMasterItemsList("Status").subscribe((response: any) => {
      this.statuses = this.commonService.masters;
    });
  }
  GetModuleSubmoduleList(id) {
    this.userTypeService.GetModuleSubmoduleList(id).subscribe((response: any) => {
      this.modulelist = JSON.parse(response);
      // console.log('modulelist', this.modulelist)



      this.selectedid = this.modulelist[0].selected;

      this.submoduleid = this.modulelist[0].selected;




      this.selected = this.selectedid.split(',').map(function (item) {
        return parseInt(item, 10);
      });


      ////var data = this.modulelist[0].listoptions;
      //this.modulelist.forEach(c => {

      //  this.submodulelist.push(JSON.parse(c.listoptions));


      //})   

   //   // console.log('submodulelist', this.submodulelist)
     // // console.log('data', data)
    });
  }
  setData(value) {
    this.userTypeStatusId.setValue(value.ValueGuid);
  }
  private initForm() { 
    this.userTypeForm = this.fb.group({
      userTypeId: [null],
      userid: [null],
      checkboxdata: [null],
      userType: ['', [Validators.required, Validators.maxLength(50)]],
      userTypeStatusId: [null, Validators.required],
      userTypeDescription: ['', [Validators.nullValidator, Validators.maxLength(1000)]]
    });
  }

  save() {
    // console.log(this.userTypeForm.value);
    if (this.userTypeForm.valid) {
      this.loadSave = true;
      this.userTypeModel.MasterId = this.userTypeForm.value.userid;
      this.userTypeModel.MasterValue = this.userTypeForm.value.userType;
      this.userTypeModel.MasterStatusId = this.userTypeForm.value.userTypeStatusId;
      this.userTypeModel.MasterDescription = this.userTypeForm.value.userTypeDescription;
      this.userTypeModel.subModuleid = this.submoduleid;
      
      this.userTypeService.addeditUserType(this.userTypeModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.router.navigateByUrl("/userTypelist");
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
    else {
      this.commonService.validateAllFormFields(this.userTypeForm);
    }

  }

  close() {
    this.router.navigate(['/userTypelist']);
  }


  fillForm(id) {
    this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
    this.userTypeService.getUserTypeDetail(id).subscribe((result: any) => {
      if (result) {
        //if (typeof result.userType !== 'undefined' && result.userType !== null) {
        //  this.getRolesByUserType(result.userType);
        //}
       // this.userTypeId = result.userType;     
        this.pageTitle = 'Edit User Type: ' + result.masterValue;    
        this.loadSave = false;
        this.statusId = result.masterStatusId;
        // // console.log("resukt", result.masterStatusId);
        this.userTypeForm.patchValue({
          userid: result.masterId,
          userType: result.masterValue,
          userTypeStatusId: result.masterStatusId,
          userTypeDescription: result.masterDescription
        });
      }
    },
      (error: any) => {
        this.loadSave = false;
      })
  }

   onChange(Id: any, event) {
    const checked = event.target.checked;
    // // console.log('selected1232', this.selected);

    if (checked) {
      this.selected.push(Id);

    }
    else {

      const index = this.selected.indexOf(Id);
      this.selected.splice(index, 1);

    }
    this.values = this.selected.toString();
    const count = this.selected.length;
    this.count = count;
     // console.log('selected', this.selected.toString());
    this.submoduleid = this.selected.toString();
    // console.log(' this.submoduleid', this.submoduleid);
  }
 
}
