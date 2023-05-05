import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonService, CheckboxData, KeyValue, JsonData } from '../../common.service';
import { takeUntil, take } from 'rxjs/operators';
import { DateTimeToLocalForAddEditPipe } from '../../../../pipes/datetime.pipe';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formview',
  templateUrl: './formview.component.html',
  styleUrls: ['./formview.component.scss']
})
export class FormviewComponent implements OnInit {

  @Input() data: any;
  @Input() index: any=10000;
  @Input() ModuleName: string = '';
  @Input() SubModuleName: string = '';
  @Input() RecordId: any = '';
  custom_view_id: any = '';
  displayType: any;
  companyId: any;
  userId: any;
  formControlList: any[] = [];
  customCompnentValues: any;
  customFieldList: any[]=[];
  form: FormGroup;
  timeFormat: any;
  title: any;
  loadSave: boolean = false;
  checkboxdata1: Array<CheckboxData> = [];
  listView: Array<KeyValue> = [];
  JsonData: JsonData = new JsonData();
  @ViewChild('ManageForm', { static: false }) modal: ModalDirective;
  @Output() RefreshEvent = new EventEmitter();


  constructor(private commonService: CommonService, private toaster:ToastrService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });}

  ngOnInit() {
    this.timeFormat = this.commonService.getTimeFormat();
    if (this.data) {
      this.title = this.data.compact_view_name;
      this.custom_view_id = this.data.compact_view_id;
      this.data = this.commonService.TryJsonParse(this.data.data);
    }
    this.displayType = 'EDIT';

    this.refresh();
   
  }

  refresh() {
    this.customCompnentValues = [];
    this.customFieldList = [];
    this.commonService.GetCustomFieldsListAsync(this.RecordId, this.custom_view_id, this.ModuleName, this.SubModuleName, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = result.data;
        this.customFieldList = null;
        this.customFieldList = result.data as any[];

        if (this.customFieldList) {
          (this.customFieldList.filter(x => (x.dt_code as string).toLowerCase() === 'select') as []).forEach((item: any) => {
            if (item.select_options)
              item.ref_value == item.select_options.filter(p => (p.value as string) == (item.ref_value as string)).name;
          });

          this.customFieldList.forEach((item) => {
            let kv = new KeyValue();
            kv.Key = item.display_name;
            kv.Value = item.ref_value;

            this.listView.push(kv);
          });
        }

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
        // console.log("formControlList", this.formControlList)
        const group: any = {};
        data_type_name: Text
        const convertdatetime = new DateTimeToLocalForAddEditPipe();

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
  }

  ShowModal() {
    this.loadSave = true;
    this.refresh();
    this.modal.show();
  }
  close() {
    this.modal.hide();
  }

  onSubmit() {
    this.loadSave = true;
    this.checkboxdata1.forEach((item) => {
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";
        if (selvalues == "" || selvalues == null) {
          this.form.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.form.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });
    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.Id = this.RecordId;
      this.JsonData.moduleCode = this.ModuleName;
      this.JsonData.subModuleCode = this.SubModuleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;

      const _formData = this.form.value;
      for (let index in _formData) {
        let data = _formData[index];
        if (data) {
          if (Date.prototype.isPrototypeOf(data)) {
            _formData[index] = this.commonService.getUserSelectedZoneToUTC(data);
          }
        }
      }

      this.JsonData.FormJsonData = JSON.stringify(this.form.value);

      this.commonService.addOrUpdateFormView(this.JsonData).subscribe((result: any) => {

        if (result.statusCode == 200) {
          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
          }, 1000);
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loadSave = false;
        }
      }, error => {
        this.loadSave = false;
      }, () => {
          this.refresh();
          this.modal.hide();
          this.RefreshEvent.emit();

      });
    }
    else {
      this.commonService.validateAllFormFields(this.form);
      this.loadSave = false;

    }

  }
  



}
