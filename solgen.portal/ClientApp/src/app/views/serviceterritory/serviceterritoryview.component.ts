import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ServiceTerritoryService, CheckboxData } from './serviceterritorylist.service';
import { CommonService } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-serviceterritoryview',
  templateUrl: './serviceterritoryview.component.html',
  styleUrls: ['./serviceterritoryview.component.scss']
})
export class ServiceterritoryviewComponent implements OnInit {

  Id: any;
  moduleName = 'settings';
  submoduleName = 'serviceterritory';
  companyId: any;
  customCompnentValues: any;
  formControlList: any[] = [];
  form: FormGroup;
  loadSave = false;
  displayType = 'VIEW';
  contentHeader: object;

  constructor(private dialogService: ConfirmationDialogService,
    private serviceTerritoryService: ServiceTerritoryService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute, ) { }
  checkboxdata1: Array<CheckboxData> = [];


  ngOnInit() {
    this.loadSave = true;
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.Id = id;
      })
    this.GetCustomFieldsList();
  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Service Territory',
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
             name : 'Manage Service Territory',
             isLink : true,
             link : '/serviceterritory'
           },
           {
             name: 'Service Territory Details',
             isLink: false
           }
  
         ]
     };
   }
  close() {
    this.router.navigateByUrl("/serviceterritory");
  }
  GetCustomFieldsList() {
    this.serviceTerritoryService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.serviceTerritoryService.customFieldsList.data;
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
          }
        })
        const group: any = {};
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? 'checked' : null;
          } else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }
          debugger;
          if (cnt.dt_code == 'select' && cnt.picklist_options == 'true') {
            if (cnt.value != "") {
              cnt.value = JSON.parse(cnt.value);
            }
          }
           
          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
              });
            }
          }
          if (cnt.dt_code == 'select' && cnt.picklist_options == 'true' && cnt.value!=null) {
            if (cnt.value != '' && cnt.select_options != null) {
              var data = JSON.parse(cnt.value);
              var valuesof = '';
              cnt.select_options.forEach(itemList => {
                //// console.log(data);
               // var spitdata = data.split(",");
                
                data.forEach(Ditem => {
                  if (itemList.value == Ditem) {
                    if (valuesof != "")
                      valuesof = valuesof + ",";
                    valuesof = valuesof + itemList.name;

                 // cnt.value = itemList.name;
                }
                });
              });
              cnt.value = valuesof;
            }
          }


          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });
        this.form = new FormGroup(group);
        setTimeout(() => {
          this.loadSave = false;
        }, 500);
      }
    });
  }

}
