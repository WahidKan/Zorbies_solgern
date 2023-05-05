import { ProductListService, JsonData, CheckboxData  } from './productlist.service';
import { CustomFieldService } from '../shared/custom-field/customfield.service';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleList } from '../shared/common.service';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DateTimeToLocalForAddEditPipe } from 'src/app/pipes/datetime.pipe';



@Component({
  selector: 'app-addeditproduct',
  templateUrl: './addeditproduct.component.html',
  //styleUrls: ['./addeditproduct.component.scss']
  providers: [ProductListService]
})

export class AddeditproductComponent implements OnInit {
  @ViewChild('IconModel', { static: false }) IconModel: ModalDirective;



  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;
  moduleName = 'Product';
  submoduleName = 'Products';
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
  JsonData: JsonData = new JsonData();
  userId: any;
  addOrUpdatePermission: boolean;
  displayType = 'ADD';
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  lstSolgenIcons: any;
  isshowicon: boolean = false;
  icontoShow: string = '';
  hideChooseIconbtn: boolean = false;
  prodIconFiledName: any;
  shortCodeFiledName: any;
  contentHeader: object;
  timeFormat: string = '12';

  constructor(private fb: FormBuilder, private productlistService: ProductListService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService, private location: Location) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'PRODUCTSADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }

    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'PRODUCTSUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'PRODUCTSDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }

  }

  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {
    this.timeFormat = this.commonService.getTimeFormat();
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('Id');
        if (id) {
          this.loadSave = true;
          this.Id = id;
          this.isLead = true;
          this.pageTitle = 'Edit Product';
          this.addOrUpdatePermission = this.isUpdate;
          this.displayType ='EDIT'
          // this.fillLeadForm(this.Id);
        } else {
          this.loadSave = true;
          this.pageTitle = 'Add Product';
          this.addOrUpdatePermission = this.isAdd;
          this.displayType ='ADD'
        }
      }
    );
    this.loadSave = true;
    this.getSolgenIcons();

    this.productlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.productlistService.customFieldsList.data;
        let fieldArray = [];
        this.customCompnentValues.forEach(cnt => {
          let groupCheck = this.formControlList.filter(y => y.group_id == cnt.group_id);

          if (cnt.dt_code == 'radio') {
            cnt.listoptions = JSON.parse(cnt.listoptions);
          }
          if (cnt.dt_code == 'checkbox') {
            cnt.listoptions = JSON.parse(cnt.listoptions);

            let checkdata = new CheckboxData();

            checkdata.controlname = cnt.form_controlName;
            this.checkboxdata1.push(checkdata);
          }

          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: cnt.group_id,
              group_name: cnt.group_name,
              group_display_name: cnt.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == cnt.group_id)
            }

            this.formControlList.push(obj);
            //for (let config of this.formControlList) {

            //}
          }
        })
        const group: any = {};
        const _datetime = new DateTimeToLocalForAddEditPipe;
        const convertdatetime = new DateTimeToLocalForAddEditPipe();
        data_type_name: Text
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else if (cnt.dt_code == 'datetime') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, null)); // to convert to local time
          }
          else if (cnt.dt_code == 'date') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, 'Date')); // to convert to local time
          }
          else {
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

          if (cnt.name == 'ProductIcon') {
            this.prodIconFiledName = cnt.form_controlName;
            if (cnt.value != null && cnt.value != '') {
              this.hideChooseIconbtn = true;
              this.isshowicon = true;
              let data = this.lstSolgenIcons.filter(x => x.name == cnt.value);
              if (data.length > 0) {
                this.icontoShow = data[0].text;
              }
            }
          };


          if (cnt.name =='short_code') {
            this.shortCodeFiledName = cnt.form_controlName;
          };


          if (cnt.dt_code == 'select' && cnt.select_options != null && (cnt.name == 'CreatedById' || cnt.name == 'LastModifiedById')) {

            if (cnt.value != '') {
              cnt.value = cnt.value.toLowerCase();
              cnt.select_options.forEach(itemList => {
                debugger
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                  val=cnt.value;
                  cnt.dt_code = 'text';
                  cnt.is_readOnly = true;
                }
              });
            } else {
              cnt.value = cnt.value.toLowerCase();
              cnt.dt_code = 'text';
              cnt.is_readOnly = true;
            }
          }

          // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])


        });

        this.form = new FormGroup(group);
        // // console.log("validationFROM", this.form);
        this.loadSave = false;
      }
    }, err => {
      this.loadSave = false;
    });

    this.hideChooseIconbtn = false;

    this.initBreadCrumb();
  }

  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Products',
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
             name : 'Manage Products',
             isLink : true,
             link : '/product'
           },
           {
             name: this.pageTitle,
             isLink: false
           }

         ]
     };
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
      this.JsonData.Id = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      this.JsonData.FormJsonData = JSON.stringify(this.form.value);

      this.productlistService.addEditForm(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
          //// // console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
          //this.toaster.success(result.responseMessage);
          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.location.back();
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
    this.location.back();
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
    this.addOrUpdatePermission = this.isUpdate;
    this.productlistService.GetProductDetails(id, this.moduleName, this.submoduleName, this.companyId, this.userId).subscribe((result: any) => {
      // // // console.log("result1212", this.leadService.leadEditPage.data[0]);
      let edit: any
      edit = this.productlistService.editPage.data[0];
      //let empty = null;
      const formGroup = {};
      if (result) {
        Object.keys(edit).forEach(cnt => {
          let cntname = cnt;
          let cntValue = edit[cnt] == '' ? null : edit[cnt];

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
    checkboxdatanew.controlname = controldisp.form_controlName;
    if (e.target.checked) {
      let strvalues = "";
      if (this.checkboxdata1.length > 0) {
        strvalues = this.checkboxdata1.find(item => item.controlname == controldisp.form_controlName).controlvalues;
      }
      if (strvalues == "") {
        checkboxdatanew.controlvalues = e.target.labels[0].innerHTML;
        this.checkboxdata1.push(checkboxdatanew);
      } else {
        let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.form_controlName);
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


  /*===================== For Icon ====================*/
  showIconPopup() {
    this.IconModel.show();
  }
  closeIconPopup() {

    this.IconModel.hide();

  }
  getSolgenIcons() {
    this.commonService.GetMasterItemsNotAuth("SolgenIcons").subscribe((result: any) => {
      this.lstSolgenIcons = this.commonService.masters;
    })
  };


  setIcon(id: any) {
    let data: any[] = [];
    data = this.lstSolgenIcons.filter(x => x.value.toString() == id.toString());

    this.IconModel.hide();

    ;
    this.form.get([this.prodIconFiledName]).setValue(null);
    this.form.get([this.prodIconFiledName]).updateValueAndValidity();
    this.form.get([this.prodIconFiledName]).setValue(data[0].name);
    //this.form.get(['1784_ProductIcon']).setValue(this.icontoShow);
    this.icontoShow = data[0].text;
    this.hideChooseIconbtn = true;
    this.isshowicon = true;
  }

  clearSelectedIcon() {
    this.form.get([this.prodIconFiledName]).setValue(null);
    this.form.get([this.prodIconFiledName]).updateValueAndValidity();
    this.icontoShow = null;
    this.isshowicon = false;
    this.hideChooseIconbtn = false;
  }

  onShowInSA(event: any) {
    if (event.target.checked) {
      this.form.get(this.shortCodeFiledName).setValidators([Validators.required]);
      this.form.get(this.shortCodeFiledName).updateValueAndValidity();

      this.form.get(this.prodIconFiledName).setValidators([Validators.required]);
      this.form.get(this.prodIconFiledName).updateValueAndValidity();
    }
    else {
      this.form.get(this.shortCodeFiledName).setValidators(null);
      this.form.get(this.shortCodeFiledName).updateValueAndValidity();

      this.form.get(this.prodIconFiledName).setValidators(null);
      this.form.get(this.prodIconFiledName).updateValueAndValidity();
    }
  };

    /*===========================================*/
}


//export class AddeditproductComponent implements OnInit {

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
//  moduleName = 'Product';
//  submoduleName = 'Products';
//  loadSave = false;
//  departmentId: any;
//  selected: any;
//  productId: any;
//  drpSelectValues: any;
//  pageTitle = 'View Product';
//  moduleRefrenceName: any;
//  sp_name: string;
//  showChild = false;
//  isLead = false;

//  formControlList: any[] = [];
//  errors: string[] = [];
//  userId: any;
//  Id: any;
//  JsonData: JsonData = new JsonData();
//  addOrUpdatePermission: boolean;
//  modulePermission: ModuleList;
//  constructor(private fb: FormBuilder, private productlistService: ProductListService, private router: Router,
//    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {

//    const moduleCode = this.route.snapshot.data.moduleCode;
//    // // console.log('Permission', moduleCode);
//    this.modulePermission = this.commonService.getPermission(moduleCode);
//    // // console.log('Permission', this.modulePermission);

//    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
//      this.sp_name = 'sp_solgen_AddEditDepartment_custom';
//      this.companyId = userdetail.companyId;
//      this.userId = userdetail.id;
//    });
//  }



//  ngOnInit() {
//    this.productlistService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId).subscribe((result: any) => {
//      if (result) {


//        //this.form.setValue(null);
//        this.customCompnentValues = this.productlistService.customFieldsList.data;
//        // // console.log("customCompnentValues", this.customCompnentValues);

//        let fieldArray = [];
//        this.customCompnentValues.forEach(cnt => {
//          let groupCheck = this.formControlList.filter(y => y.group_id == cnt.group_id);
//          if (groupCheck == null || groupCheck.length == 0) {
//            let obj = {
//              group_id: cnt.group_id,
//              group_name: cnt.group_name,
//              group_display_name: cnt.group_display_name,
//              InnerData: this.customCompnentValues.filter(x => x.group_id == cnt.group_id)
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
//        if (this.Id != null && this.Id != 0) {
//         // this.fillForm(this.productId);
//        }

//      }
//    });


//    this.route.paramMap.subscribe(
//      params => {
//        const id = params.get('Id');
//        if (id) {
//          this.loadSave = true;
//          this.Id = id;
//          this.isLead = true;
//          this.pageTitle = 'Edit Product';
//          this.fillForm(this.Id);
//        } else {
//          this.pageTitle = 'Add Product';
//          this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
//        }
//      }
//    );

//  }
//  onSubmit() {
//    this.loadSave = true;
//    //// // console.log("EditVal", this.form);
//    if (this.form.valid) {
//      this.loadSave = true;
//      this.JsonData.Id = this.Id;
//      this.JsonData.moduleCode = this.moduleName;
//      this.JsonData.subModuleCode = this.submoduleName;
//      this.JsonData.companyId = this.companyId;
//      this.JsonData.userId = this.userId;
//      this.JsonData.FormJsonData = JSON.stringify(this.form.value);

//      this.productlistService.addEditForm(this.JsonData).subscribe((result: any) => {
//        if (result.statusCode == 200) {
//          //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
//          //// // console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
//          //this.toaster.success(result.responseMessage);
//          setTimeout(() => {
//            this.toaster.success(result.responseMessage);
//            this.loadSave = false;
//            this.router.navigateByUrl("/product");
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

//  displayInsuranceDetail(reposnse): void {
//    const formGroup = {};
//    for (let prop of Object.keys(this.customCompnentValues)) {
//      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
//    }
//    this.form = new FormGroup(formGroup);
//  }

//  close() {
//    this.router.navigateByUrl("/product");
//  }



//  fillForm(id) {
//    this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
//    this.productlistService.GetProductDetails(id, this.moduleName, this.submoduleName).subscribe((result: any) => {
//      //// // console.log("result1212", this.productlistService.editPage.data[0]);
//      let edit: any
//      edit = this.productlistService.editPage.data[0];
//      //let empty = null;
//      const formGroup = {};
//      if (result) {
//        Object.keys(edit).forEach(cnt => {
//          let cntname = cnt;
//          let cntValue = edit[cnt] == '' ? null : edit[cnt];
//          //// // console.log("cntname", cntname)
//          //// // console.log("cntname", cntValue)
//          formGroup[cntname] = new FormControl(cntValue);
//        })
//        // // // console.log("formGroup", formGroup);
//        // this.form.value.reset();
//        this.form = new FormGroup(formGroup);
//        this.loadSave = false;

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
//      //objItem.select_options = array;
//    }
//    return array
//  }

//}
