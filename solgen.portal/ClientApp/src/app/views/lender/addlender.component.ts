import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleList } from '../shared/common.service';
import { LenderlistService, LenderJsonData, CheckboxData, WebmergeDataRoute } from './lenderlist.service';
import { DocumentmappingComponent } from './documentmapping/documentmapping.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { DataRoutingComponent } from './data-routing/data-routing.component';
import { id } from '@swimlane/ngx-datatable';
import { transform } from 'html2canvas/dist/types/css/property-descriptors/transform';
import { RoutingDeliveryComponent } from './routing-delivery/routing-delivery.component';


@Component({
  selector: 'app-addlender',
  templateUrl: './addlender.component.html',
  styleUrls: ['./addlender.component.scss']
})
export class AddlenderComponent implements OnInit {
  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;
  moduleName = 'finance';
  submoduleName = 'lender';
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  sDtaa: any;
  loadSave = false;
  Id: any = '';
  isLead = false;
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  JsonData: LenderJsonData = new LenderJsonData(); 
  userId: any;
  addOrUpdatePermission: boolean=false;
 // modulePermission: ModuleList;
  count: number = 0;
  solarInstall: boolean = false;

  loanDocuments: any[] = [];
  loadDocuments: boolean = false;
  pageModuleName: any;

  dataRoutes: WebmergeDataRoute[] = [];
  loadRoutes: boolean = false;

  sortDir = 'desc';
  sortColumn = 'createdon';
  currentPage: any = 1;
  pageSizeValue: number;
  lstPageSize: any;
  webmergeMappingsPagedData: any = {
    pager: {},
    data: []
  };
  loadWebmergeMappingsPagedData: boolean = false;
  modulePermission: any[] = [];

  @ViewChild('documentMapping', { static: false }) documentMapping: DocumentmappingComponent;
  @ViewChild('uploadDocument', { static: false }) uploadDocument: UploadDocumentComponent;
  @ViewChild('dataRouting', { static: false }) dataRouting: DataRoutingComponent;
  @ViewChild('delivery', { static: false }) delivery: RoutingDeliveryComponent;

  constructor(private fb: FormBuilder, private lenderService: LenderlistService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {

    this.pageModuleName = "Bank";
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      // // console.log('userdetail', userdetail)
      if (userdetail.companyType == 'companytypeSolarInstall') {
        this.solarInstall = true;
        this.pageModuleName = "Lender";
      }
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;

    });
    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    if (add == undefined) {
      this.addOrUpdatePermission = false;
    } else {

      this.addOrUpdatePermission = true;
    }
  }



  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.loadSave = true;
          this.Id = id;
          this.isLead = true;
          this.pageTitle = 'Edit ' + this.pageModuleName ;
          
          //this.fillLeadForm(this.Id);
          this.pageSizeValue = 10;
          this.currentPage = 1;
          this.getPageSizes();

          this.GetLoanDocuments(id);
          this.GetDataRoutes(id);
          this.GetWebmergeMappings(id);          
        } else {
          this.pageTitle = 'Add ' + this.pageModuleName ;
         
        }
      }
    );
    this.lenderService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.lenderService.customFieldsList.data;

        if (this.solarInstall != true) {
          var index = this.customCompnentValues.findIndex((item) => item.ColumnName == 'PullProduct');
          this.customCompnentValues.splice(index, 1);
          index = this.customCompnentValues.findIndex((item) => item.ColumnName == 'SyncEnable');
          this.customCompnentValues.splice(index, 1);
        }
        //if (this.companyId == '1002') {   
        //  var index = this.customCompnentValues.findIndex((item) => item.ColumnName == 'PullProduct');
        //  this.customCompnentValues.splice(index, 1);
        //   index = this.customCompnentValues.findIndex((item) => item.ColumnName == 'SyncEnable');
        //  this.customCompnentValues.splice(index, 1);
        //}

        // // console.log("this.customCompnentValues", this.customCompnentValues);

        let fieldArray = [];
        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }

            this.formControlList.push(obj);
            //for (let config of this.formControlList) {

            //}
          }
        })
        const group: any = {};
        data_type_name: Text
        this.customCompnentValues.forEach(cnt => {
          let val = null;

          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          } else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }


          //------------------

          //if (cnt.ColumnName == 'SyncEnable') {
          //  this.lenderService.GetFinancialInstitute(this.companyId, this.Id).subscribe((result: any) => {              
          //    // // console.log('result', this.lenderService.customFinancialList)
          //    if (this.lenderService.customFinancialList == false) {              
          //    var removed = this.customCompnentValues.splice(this.count, 1);               
          //    }
          //  });
          //}

          // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])

          this.count++
        });

        this.form = new FormGroup(group);
        // // console.log("validationFROM", this.form);
        this.loadSave = false;
      }
    });



  };

  private GetLoanDocuments(id: string) {
    this.loadDocuments = true;
    this.lenderService.getWebmergeDocuments(id).subscribe(resp => {
      this.loadDocuments = false;
      this.loanDocuments = resp.filter(r => r.active == true);
    }, err => {
        this.loadDocuments = false;
    });
  }

  private GetDataRoutes(bankId: any) {
    this.loadRoutes = true;
    this.lenderService.getWebmergeDataRoutes(bankId).subscribe(dataRoutes => {
      this.dataRoutes = dataRoutes;
      this.loadRoutes = false;
    }, err => {
        this.loadRoutes = false;
    });
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  setPage($event) {

    this.currentPage = $event.page - 1;
    this.GetWebmergeMappings(this.Id);
  }
  onSort($event) {
    const sort = $event.sorts[0];
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = $event.page - 1;
    this.GetWebmergeMappings(this.Id);;
  }

  private GetWebmergeMappings(bankId: any) {
    this.loadWebmergeMappingsPagedData = true;
    this.lenderService.getWebmergeMappingsList(bankId, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue).subscribe(mappingsList => {
      this.loadWebmergeMappingsPagedData = false;
      // console.log("mappingsList", mappingsList)
      this.webmergeMappingsPagedData = mappingsList;
    }, err => {
        this.loadWebmergeMappingsPagedData = false;
    })
  }

  checkvalue(formvalues, selval) {
    let returnValue = false;
    if (formvalues != null) {
      // // console.log("formvaluesformvaluesformvalues", formvalues);
      formvalues.split(',').find((item) => {
        if (item == selval) {
          // // console.log('abc');
          returnValue = true;

        }
      });
    }
    return returnValue;
  }
  test(e) {
    // // console.log('sssss', e);
    e.stopPropagation();
    e.preventDefault();
  }
  OnCheck() {
    // // console.log(this.form);
  }
  onSubmit() {
    this.loadSave = true;
    this.checkboxdata1.forEach((item) => {
      // // console.log(item.controlname);
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";// this.form.get(item.controlname).value;
        if (selvalues == "" || selvalues == null) {
          this.form.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.form.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });
    // // console.log("EditVal", this.form.value);
    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.ID = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      this.JsonData.FormJsonData = JSON.stringify(this.form.value);
      //

      this.lenderService.addEditForm(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
          //// // console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
          //this.toaster.success(result.responseMessage);
          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.router.navigateByUrl("/lender");
          }, 1000);
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loadSave = false;
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.form);
      this.loadSave = false;

    }

  }

  displayInsuranceDetail(reposnse): void {
    const formGroup = {};
    for (let prop of Object.keys(this.customCompnentValues)) {
      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
    }
    this.form = new FormGroup(formGroup);
  }

  close() {
    this.router.navigateByUrl("/lender");
  }



  //      this.form = new FormGroup(formGroup);
  //      // // console.log("EdittttPageee", this.form);
  //      this.loadSave = false;

  //    }
  //  },
  //    (error: any) => {
  //      this.loadSave = false;
  //    })

  //}

  fillLeadForm(id) {
   
    this.lenderService.GetLenderDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe((result: any) => {
      // // // console.log("result1212", this.leadService.leadEditPage.data[0]);
      let edit: any
      edit = this.lenderService.lenderEditPage.data[0];
      //let empty = null;
      const formGroup = {};
      if (result) {
        Object.keys(edit).forEach(t => {
          let cntname = t;
          let cntValue = edit[t] == '' ? null : edit[t];

          // // console.log("cntname", cntname)
          if (cntValue !== null && cntValue.indexOf("[") !== -1 && cntValue.indexOf("]") !== -1) {

            cntValue = JSON.parse(cntValue);
          }
          if (cntValue !== null && (cntValue == 'true' || cntValue == 'false')) {

            cntValue = (cntValue == 'true');
            // // console.log("cntValuecntValue", cntValue);
          }

          this.checkboxdata1.forEach((item) => { if (cntname == item.controlname) { item.controlvalues = cntValue; } });//for checkboxes on form
          formGroup[cntname] = new FormControl(cntValue);
        })

        // this.form.value.reset();
        this.form = new FormGroup(formGroup);


        //for checkboxes on form
        try {
          this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
            this.form.get(item.controlname).setValue(item.controlvalues.split(','));
          });
          //this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });

        }
        catch (err) { }
        /////
        // // console.log("formGroup", this.form.value);
        this.loadSave = false;

      }
    },
      (error: any) => {
        this.loadSave = false;
      })

  }
  MakeArray(value, type) {
    var array = [];
    var arr = String(value).split(',');
    if (type == "radio" || type == "checkbox") {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {

          if (arr[i].split("|").length > 1) {
            var person = { name: arr[i].split("|")[0], value: arr[i].split("|")[1] };
            array.push(person);
          }
          else {
            var person = { name: arr[i], value: arr[i] };
            array.push(person);
          }
        }
      }
    }
    else {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          var person = { name: arr[i], value: arr[i] };
          array.push(person);
        }
      }
    }

    return array;
  }
  MakeNormalArray(value) {
    if (value) {
      try {
        return JSON.parse(value);
      }
      catch (ex) {
        return value;
      }
    }
    else {
      value = [];
    }
  }
  MakeSelectArray(objItem) {
    var array = [];
    var arr = String(objItem.select_options).split(',');
    if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {

      var person = { name: arr[0], value: arr[1] };
      array.push(person);
      //objItem.select_options = array;
    }
    return array
  }
  removeValue = function (list, value, separator) {
    separator = separator || ",";
    var values = list.split(separator);
    for (var i = 0; i < values.length; i++) {
      if (values[i] == value) {
        values.splice(i, 1);
        return values.join(separator);
      }
    }
    return list;
  }


  onCheckboxChange(e, groupdisp, controldisp) {
    // // console.log('new', e);
    //const index2: number = this.formControlList.indexOf(groupdisp);
    //const index1: number = controldisp.display_order;

    let checkboxdatanew = new CheckboxData();
    checkboxdatanew.controlname = controldisp.ColumnName;
    if (e.target.checked) {
      let strvalues = "";
      if (this.checkboxdata1.length > 0) {
        strvalues = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName).controlvalues;
      }
      if (strvalues == "") {
        checkboxdatanew.controlvalues = e.target.labels[0].innerHTML;
        this.checkboxdata1.push(checkboxdatanew);
      } else {
        let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName);
        let index = this.checkboxdata1.indexOf(updateItem);
        this.checkboxdata1[index].controlvalues = strvalues + "," + e.target.labels[0].innerHTML;


      }


      //  if (this.formControlList[index2].InnerData[index1].value == "") {
      //    this.formControlList[index2].InnerData[index1].value = e.target.labels[0].innerHTML;

    }
    else {

      let strs = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName).controlvalues.split(",");

      let updatedval = strs.splice(strs.indexOf(e.target.labels[0].innerHTML), 1);
      //checkboxdatanew.controlvalues = updatedval.toString();
      let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName);
      let index = this.checkboxdata1.indexOf(updateItem);
      this.checkboxdata1[index].controlvalues = strs.toString();
      //this.checkboxdata1.push(checkboxdatanew);
      //    this.formControlList[index2].InnerData[index1].value = this.formControlList[index2].InnerData[index1].value + "," + e.target.labels[0].innerHTML;
    }
    //}
    //else {
    //  this.formControlList[index2].InnerData[index1].value=this.removeValue(this.formControlList[index2].InnerData[index1].value, e.target.labels[0].innerHTML, ',');
    //}

    // // console.log('sss', e);
    var dd = this.formControlList;

  }

  OpenMapping(document) {
    this.documentMapping.show(this.Id, document.id);
  }

  documentMappings() {
    this.GetWebmergeMappings(this.Id);
  }

  uploadFormStackDocument() {
    this.uploadDocument.show(this.Id, null);
  }

  uploadDocuments() {
    this.GetLoanDocuments(this.Id);
  }

  createDataRoute() {
    this.dataRouting.show('', this.Id);
  }

  OpenRoute(row: any) {
    this.dataRouting.show(row.id, this.Id);
  }

  dataRoutingEmit() {
    this.GetDataRoutes(this.Id);
  }

  EditDocument(row: any) {
    this.uploadDocument.show(this.Id, row.id);
  }

  createWebmergeMapping() {
    this.documentMapping.show(this.Id, 0);
  }

  updateWebmergeMapping(row: any) {
    this.documentMapping.show(this.Id, row.Id);
  }

  OpenDocumentDelivery(row) {
    this.delivery.show(row.id, "Document", this.Id)
  }

  OpenRouteDelivery(row: any) {
    this.delivery.show(row.id, "Route", this.Id)
  }

  onIsDefaultChange(row) {
    this.loadSave = true;
    this.lenderService.setDefaultWebmergeMapping(row.Id, this.Id).subscribe(resp => {
      this.loadSave = false;
      this.GetWebmergeMappings(this.Id);
      if (resp.statusCode == 200) {
        this.toaster.success(resp.responseMessage);
      } else {
        this.toaster.error(resp.responseMessage);
      }
    }, err => {
        this.loadSave = false;
    });
  }
}


//export class AddlenderComponent implements OnInit {
//  config: any[] = [];
//  control: any;
//  group_id: any;
//  group_name: any;
//  group_display_name: any;
//  customCompnentValues: any;
//  form: FormGroup;
//  formGroup: FormGroup;
//  companyId: any;
//  grpId: any;
//  sDtaa: any;
//  moduleName = 'finance';
//  submoduleName = 'lender';
//  loadSave = false;
//  departmentId: any;
//  selected: any;
//  lenderId: any;
//  drpSelectValues: any;
//  pageTitle = 'Edit Lender';
//  moduleRefrenceName: any;
//  sp_name: string;
//  showChild = false;
//  isLender = false;
//  //leadJsonData: LenderJsonData;
//  lenderJsonData: LenderJsonData = new LenderJsonData();
//  formControlList: any[] = [];
//  errors: string[] = [];
//  userId: any;

//  constructor(private fb: FormBuilder, private lenderService: LenderlistService, private router: Router,
//    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {

//    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
//      this.companyId = userdetail.companyId;
//      this.sp_name = 'sp_solgen_AddEditDepartment_custom';
//      this.userId = userdetail.id;
//    });
//  }

//  ngOnInit() {
//    this.lenderService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
//      if (result) {

//        this.customCompnentValues = this.lenderService.customFieldsList.data;
//        //// // console.log("customCompnentValues", this.customCompnentValues);

//        let fieldArray = [];
//        this.customCompnentValues.forEach(t => {
//          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
//          if (groupCheck == null || groupCheck.length == 0) {
//            let obj = {
//              group_id: t.group_id,
//              group_name: t.group_name,
//              group_display_name: t.group_display_name,
//              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
//            }

//            this.formControlList.push(obj);
//            for (let config of this.formControlList) {

//            }
//          }
//        })
//        const group: any = {};
//        let val = null;
//        this.customCompnentValues.forEach(cnt => {
//          group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)

//        });
//        this.form = new FormGroup(group);
//        if (this.lenderId != null && this.lenderId != 0) {
//        }

//      }
//    });


//    this.route.paramMap.subscribe(
//      params => {
//        const id = params.get('id');
//        if (id) {
//          this.loadSave = true;
//          this.lenderId = id;
//          this.isLender = true;
//          this.pageTitle = 'Edit Lender';
//          this.fillLenderForm(this.lenderId);
//        } else {
//          this.pageTitle = 'Add Lender';
//        }
//      }
//    );

//  }

//  //Edit case handle 
//  displayInsuranceDetail(reposnse): void {
//    const formGroup = {};
//    for (let prop of Object.keys(this.customCompnentValues)) {
//      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
//    }

//    this.form = new FormGroup(formGroup);
//  }
//  onSubmit() {
//    this.loadSave = true;
//    //// // console.log("EditVal", this.form);
//    if (this.form.valid) {
//      this.loadSave = true;
//      this.lenderJsonData.ID = this.lenderId;
//      this.lenderJsonData.moduleCode = this.moduleName;
//      this.lenderJsonData.subModuleCode = this.submoduleName;
//      this.lenderJsonData.companyId = this.companyId;
//      this.lenderJsonData.userId = this.userId;
//      this.lenderJsonData.FormJsonData = JSON.stringify(this.form.value);
//      this.lenderService.addEditForm(this.lenderJsonData).subscribe((result: any) => {
//        if (result.statusCode == 200) {
//          this.toaster.success(result.responseMessage);
//          setTimeout(() => {
//            this.loadSave = false;
//            this.router.navigateByUrl("/lender");
//          }, 1000);
//        }
//        else {
//          this.toaster.error(result.responseMessage);
//          this.loadSave = false;
//        }
//      }, error => {
//        this.loadSave = false;
//      });
//    }
//    else {
//      this.commonService.validateAllFormFields(this.form);
//      this.loadSave = false;

//    }

//  }
//  onOptionsSelected(event, item) {
//  }

//  close() {
//    this.router.navigateByUrl("/lender");
//  }

//  fillLenderForm(id) {
//     this.lenderService.GetLenderDetails(id, this.moduleName, this.submoduleName).subscribe((result: any) => {
//      let edit: any
//       if (this.lenderService.lenderEditPage.responseCode != 200) {
//        edit = this.lenderService.lenderEditPage.data[0];
//        const formGroup = {};
//        if (result) {
//          Object.keys(edit).forEach(t => {
//            let cntname = t;
//            let cntValue = edit[t] == '' ? null : edit[t];
//            formGroup[cntname] = new FormControl(cntValue);
//          })
//            this.form = new FormGroup(formGroup);
//          this.loadSave = false;

//        }
//      }
//    },
//      (error: any) => {
//        this.loadSave = false;
//      })

//  }

//  MakeArray(value, type) {
//    var array = [];
//    var arr = String(value).split(',');
//    if (type == "radio" || type == "checkbox") {
//      if (arr.length > 0) {
//        for (var i = 0; i < arr.length; i++) {
//          if (arr[i].split("|").length > 1) {
//            var person = { name: arr[i].split("|")[0], value: arr[i].split("|")[1] };
//            array.push(person);
//          }
//          else {
//            var person = { name: arr[i], value: arr[i] };
//            array.push(person);
//          }
//        }
//      }
//    }
//    else {
//      if (arr.length > 0) {
//        for (var i = 0; i < arr.length; i++) {
//          var person = { name: arr[i], value: arr[i] };
//          array.push(person);
//        }
//      }
//    }

//    return array;
//  }
//  MakeNormalArray(value) {
//    if (value) {
//      try {
//        return JSON.parse(value);
//      }
//      catch (ex) {
//        return value;
//      }
//    }
//    else {
//      value = [];
//    }
//  }
//  MakeSelectArray(objItem) {
//    var array = [];
//    var arr = String(objItem.select_options).split(',');
//    if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {

//      var person = { name: arr[0], value: arr[1] };
//      array.push(person);
//    }
//    return array
//  }
//}
