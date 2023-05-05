import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonService, WelcomeCallSaveModel } from '../common.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { CheckboxData } from '../../department/department.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DateTimeToLocalForAddEditPipe } from '../../../pipes/datetime.pipe';
import { isNullOrUndefined } from 'util';
import { convertToArrayListPipe } from '../../../pipes/functions.pipe';


@Component({
  selector: 'app-welcomecallpopup',
  templateUrl: './welcomecallpopup.component.html',
  styleUrls: ['./welcomecallpopup.component.scss']
})
export class WelcomecallpopupComponent implements OnInit {
  @Input('moduleName') moduleName: string;
  @Input('submoduleName') submoduleName: string;
  @Input('primaryKey') accountId: string;
  @Input('title') title: string;
  @ViewChild('welcomeCall', { static: false }) welcomecall: ModalDirective;
  @Input("isVisible") isVisibleWelcomeCall: boolean = false;
  @Output() refreshParentEmitter = new EventEmitter();

  constructor(private commanService: CommonService, private fb: FormBuilder, private dialogService: ConfirmationDialogService, private toaster: ToastrService) { }
  controls: Array<any> = [];
  welcomeCallDetailsData: any[];    
  flowData: any[] = [];
  formField: any[] = [];
  showData: any[] = [];
  replacedata: any[] = [];
  replacedataid: any[] = [];
  formName: any;
  totalLength: number;
  currentpage: number = 0;
  formControlList: any[] = [];
  manageForm: FormGroup;
  formGroup: FormGroup;
  checkboxdata1: Array<CheckboxData> = [];
  welcomeCallSaveModel: WelcomeCallSaveModel = new WelcomeCallSaveModel();
  dependentvalue: string = '';
  //accountId: string = '';
  loadSave: boolean = false;
  FlowId: number = 0;
  stepno: number = 0;
  ngOnInit() {  
    this.currentpage = 0;
    this.stepno = 0;
  }
  show(accountId) {
    this.isVisibleWelcomeCall = true;
    this.accountId = accountId;
    this.getScreenData('Next');
   // this.welcomecall.show();
  }
  getScreenData(type:any) {

    this.loadSave = true;
    this.commanService.GetWelcomeCallDetails(this.accountId, this.moduleName, this.submoduleName, this.FlowId, this.stepno, type,'Welcome_Call').subscribe((result: any) => {
      if (result) {
        this.welcomeCallDetailsData = null;
        if (this.commanService.welcomeCallDetailsList) {
          //;
          this.welcomeCallDetailsData = this.commanService.welcomeCallDetailsList.data;
          // console.log('welcomeCallDetailsData', this.welcomeCallDetailsData)
         
            this.loadSave = false;
            this.replacedata = this.commanService.welcomeCallDetailsList.related;
          this.replacedataid = this.commanService.welcomeCallDetailsList.related_ID;
            this.flowData = this.welcomeCallDetailsData[0].data[0].flow_data;
            this.stepno = this.welcomeCallDetailsData[0].data[0].stepno;

            this.totalLength = this.flowData.length;

            this.formField = this.flowData[0].form_field;


            // console.log("this.replacedata ", this.replacedata);
          // console.log("formField", this.formField);

            this.loadForm();

          
        }
        else {
         
         // this.welcomecall.hide();
          this.stepno = 0;
          this.refreshParentEmitter.emit();

        }
      } 
      else {
        this.refreshParentEmitter.emit();
      }
    }, err => { }, () => { setTimeout(() => { this.loadSave = false; }, 3000); });
   // this.welcomecall.show();
   setTimeout(() => { this.loadSave = false; }, 3000);
  }


  loadForm() {
  
    this.showData = this.formField.filter(x => x.is_dependent != true);
    // console.log('showData', this.showData);
    
  
    this.formField.forEach(t => {

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
          InnerData: this.formField.filter(x => x.group_id == t.group_id)
        }
        this.formControlList.push(obj);
      }
    })
    const group: any = {};
    data_type_name: Text;
    const convertdatetime = new DateTimeToLocalForAddEditPipe();
     const array = new convertToArrayListPipe;

    this.formField.forEach(cnt => {
     
        // console.log('cnt', cnt);
    
      let val = null;
      let actual_name = cnt.name.replaceAll(" ", "")

      cnt.value = this.replacedata[0][actual_name];
      var id = this.replacedataid[0][actual_name];
      

      if (cnt.custom_field_id > 0 && (cnt.value == null || cnt.value == undefined)) {
        cnt.value = this.replacedata[0][cnt.PrimaryTableColumn];
      }


        if (cnt.actual_data_type == 'bit') {
          val = cnt.value == 1 ? true : false;
          if (val == true ) {
            cnt.default_value = true;
          }
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
      if (cnt.dt_code == 'select') {
        ;
        if (cnt.value != null) {
          let ab: any[] = [];
          ab = array.transform(cnt.select_options)
         
          var temp = ab.filter(m => m.value == id.toString());
          if (temp.length == 0) {
            ab.push({ name: cnt.value, value: id.toString() })
          }


          cnt.select_options = ab;
            
        
          //cnt.select_options = array.transform(cnt.select_options)
          //let aa = JSON.parse(cnt.select_options);
          cnt.select_options.forEach(itemList => {
            if (itemList.name == cnt.value) {
              val = itemList.value;
            }
          });
         
         
        }
      }
      if (cnt.field_type == 'texteditor') {
        //var result = cnt.default_value.match(/{{(.*?)}}/)
        let data: any[] = [];
        if (cnt.default_value != '' && cnt.default_value != null) {
          if (cnt.default_value.indexOf('{{') !== -1) {
            data = this.extract(['{{', '}}'])(cnt.default_value);
          }

          data.forEach(s => {
            // console.log('s', s);
            var replacedata = this.replacedata[0][s];
            // console.log('replacedata', replacedata);
          

            //s=s.co
            var beg = '{{';
            var end = '}}';
            var ab = beg.concat(s.toString());
            var data = ab.concat(end);
            // console.log('sadsd', data);
            if (replacedata == null)
              replacedata = '';
            cnt.default_value = cnt.default_value.replace(`${data}`, `<strong>${replacedata}</strong>`)
          })

        }
        //var result = cnt.default_value.match(/{{([^}]+)}}/)
        //// console.log('result', result);
      }
      //source.match(/a(.*)j/);
        this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
        if (cnt.actual_data_type == 'checkbox') {
          try {
            this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
              this.manageForm.get(item.controlname).setValue(item.controlvalues.split(','));
            });
          }
          catch (err) { }
        }

        
        group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
        cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
          cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
              Validators.nullValidator
        ])
      
    });

    // console.log(group)
    this.manageForm = new FormGroup(group);
    this.loadSave = false;

  }
  extract([beg, end]) {
  const matcher = new RegExp(`${beg}(.*?)${end}`, 'gm');
    const normalise = (str) => str.slice(beg.length, end.length * -1);
    // console.log('normalise',normalise);
    return function (str) {
      let data: any[] = [];
      // console.log('str', str);

      data=str.match(matcher).map(normalise);
      return data;
    }
}
  close() {
    this.currentpage = 0;
    this.stepno = 0;
    this.refreshParentEmitter.emit();
    //this.welcomecall.hide();  
  }
  Next() {
    
    this.loadSave = true;
    this.checkboxdata1.forEach((item) => {
      // // console.log(item.controlname);
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";// this.form.get(item.controlname).value;
        if (selvalues == "" || selvalues == null) {
          this.manageForm.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.manageForm.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });
    var ab2 = JSON.stringify(this.manageForm.value);
    // console.log('beforeassfdsfdsfa', ab2)
    if (this.manageForm.valid) {
      this.welcomeCallSaveModel.AccountId = this.accountId;
      this.welcomeCallSaveModel.subModuleName = this.submoduleName;
      this.welcomeCallSaveModel.moduleName = this.moduleName;
      if (this.welcomeCallDetailsData) {
        this.welcomeCallSaveModel.FlowId = this.welcomeCallDetailsData[0].data[0].FlowId;
      }
      this.welcomeCallSaveModel.Screenid = this.flowData[0].ScreenId;
      this.welcomeCallSaveModel.AccountId = this.accountId;
      this.welcomeCallSaveModel.data = JSON.stringify(this.manageForm.value);
      var ab = JSON.stringify(this.welcomeCallSaveModel);
      // console.log('saveData', ab)
      this.commanService.saveWelcomeCall(this.welcomeCallSaveModel).subscribe((result: any) => {
        //this.toaster.success('saved succesfully');
        
      }, err => { }, () => {
          this.currentpage = this.currentpage + 1;
          //if (this.totalLength == this.currentpage) {
          //  this.currentpage = 0;
          //  this.welcomecall.hide();
          //  this.loadSave = false;
          //}
          //else {

          this.stepno = this.stepno + 1;
          this.getScreenData('Next');
            
            // console.log("formField", this.formField);
            // console.log("totalLength", this.totalLength);
            this.loadForm();
            //// console.log("welcomeCallDetailsData", this.welcomeCallDetailsData);
       
         // }


      })
    }
    setTimeout(() => { this.loadSave = false; }, 3000);
  }
  Previous() {
    this.currentpage = this.currentpage - 1;
  
    this.stepno = this.stepno - 1;
    
    this.getScreenData('previous');
   // this.formField = this.flowData[this.currentpage].form_field;
    this.loadForm();
    //// console.log("welcomeCallDetailsData", this.welcomeCallDetailsData);
    // console.log("flowData", this.flowData);
    // console.log("formField", this.formField);
    // console.log("totalLength", this.totalLength);
  }
  onChange(event: any, id: any, control: any) {
    // console.log(this.formField)
    var checkbool
    if (event.target.checked) {
      checkbool = 'true'
    }
    else {
      checkbool='false'
    }
    const checked:boolean = event.target.checked;
    const ctrl = control;
    var tempid = String(id);
    
    var tempdata = this.formField.filter(m => String(m.dependent_id) == tempid && m.dependent_value == checkbool);

    if (tempdata.length>0) {      
        var index = this.showData.findIndex(x => x.form_field_id.toString() == ctrl.form_field_id.toString());

        tempdata.forEach((item, itemIndex) => {
          this.showData.splice(((index + 1) + itemIndex), 0, item);
        })
    }
    else {
      this.showData = this.showData.filter(m => String(m.dependent_id) != tempid);
    }


    //if (checked) {
    //  var index = this.showData.findIndex(x => x.form_field_id.toString() == ctrl.form_field_id.toString());

    //  var tempdata = this.formField.filter(m => String(m.dependent_id) == tempid );

    //  if (tempdata.length > 0) {
    //    tempdata.forEach((item, itemIndex) => {
    //      this.showData.splice(((index + 1) + itemIndex), 0, item);
    //    })
    //  }
    //}
    //else {
    //  this.showData = this.showData.filter(m => String(m.dependent_id) != tempid);
    //}





    //this.formField.forEach(cnt => {
    //  if (checked) {
    //    ;
    //    if (cnt.is_dependent && cnt.dependent_id.toString() == id.toString()) {
    //      var index = this.showData.findIndex(x => x.form_field_id.toString() == cnt.form_field_id.toString())



    //        this.showData.push(cnt);
          

    //    }
    //  }
    //  else {
    //    if (cnt.is_dependent && cnt.dependent_id.toString() == id.toString()) {
    //      var index = this.showData.findIndex(x => x.form_field_id.toString() == cnt.form_field_id.toString())
    //      if (index != -1) {
    //        this.showData.splice(index, 1);
    //      }
    //    }
    //  }
     
     
    //})

}
  check(e: any, item: any, control: any, id: any,) {
    // console.log('e', e);
    // console.log('item', item);
    const ctrl = control;
    var tempid = String(id);
    const group: any = {};
    const convertdatetime = new DateTimeToLocalForAddEditPipe();


    var tempdata = this.formField.filter(m => m.is_dependent && m.dependent_value == item);
    // console.log('formFieldradio', this.formField)
    

    if (tempdata.length > 0) {
  
      var index = this.showData.findIndex(x => x.form_field_id.toString() == ctrl.form_field_id.toString());

      tempdata.forEach((item, itemIndex) => {
        this.showData.splice(((index + 1) + itemIndex), 0, item);
      })
    }
    else {   
      this.showData = this.showData.filter(m => String(m.dependent_id) != tempid);
    }
   
  }
  onScrollToEnd(dataList: any, j: number) {
    this.fetchMore(dataList, j);
  }
  searchText: string;
  len: any = 10;
  custom_field_id: any;
  field_code: any;
  scrollDataList: any;
  private fetchMore(dataList: any, j: number) {
    
    // console.log("e", dataList);
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    //const array = new convertToArrayListPipe;
   // let ab : any[] = [];
   // ab = array.transform(dataList.select_options)
    this.len = dataList.select_options.length;
    this.custom_field_id = dataList.custom_field_id;
    this.field_code = dataList.field_code;
    let data = (dataList.select_options as any[]);
    //this.len = this.getreturnNumber(this.len = 10, dataList[j].select_options.length);
    this.commanService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commanService.customFieldsListData;
      // console.log('scrollDataList', this.scrollDataList);
      (dataList.select_options as any[]) = (dataList.select_options as any[]).concat(this.scrollDataList);

    })
  }

  onKey(e: any, dataList: any, j: number) {
    this.len = 0
    this.custom_field_id = dataList.custom_field_id;
    this.field_code = dataList.field_code;
    this.searchText = e.target.value;
    this.commanService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commanService.customFieldsListData;
      (dataList.select_options as any[]) = this.scrollDataList;
    })
  }

  onClearLang(dataList: any, j: number): void {
    this.len = 0
    this.custom_field_id = dataList.custom_field_id;
    this.field_code = dataList.field_code;
    this.searchText = '';
    this.commanService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commanService.customFieldsListData;
      (dataList.select_options as any[]) = this.scrollDataList;
    })
  }
  
}
