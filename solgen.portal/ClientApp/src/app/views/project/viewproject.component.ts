import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckboxData } from '../lead/lead.service';
import { ProjectService } from './project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CommonService } from '../shared/common.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fieldsJson } from '../managecustomlayout/managecustomlayout.service';

@Component({
  selector: 'app-viewproject',
  templateUrl: './viewproject.component.html',
  styleUrls: ['./viewproject.component.scss']
})
export class ViewprojectComponent implements OnInit {

  Id: any;
  moduleName = 'settings';
  submoduleName = 'projects';
  companyId: any;
  customCompnentValues: any;
  formControlList: any[] = [];
  form: FormGroup;
  loadSave = false;
  displayType = 'VIEW';
  ProjectName: string = "";

  lstGetServiceTerritoryList: any = {
    pager: {},
    data: []
  }
  lstAppointments: any = {
    pager: {},
    data: []
  }
  lstSkill: any = {
    pager: {},
    data: []
  }
  lstServiceCrew: any = {
    pager: {},
    data: []
  }
  lstAbsence: any = {
    pager: {},
    data: []
  }
  countAbcense: number = 0;
  ServiceAppointmentsCount: any = 0;

  campaignMembersCount: number = 0;
  SkillsCount: number = 0;
  proposalsCount: number = 0;
  leadsCount: number = 0;
  countServiceCrew: number = 0;
  countAbsences: number = 0;
  pageNo: number = 1;
  pageSize: number = 4;
  SkillPageNo: number = 1;
  sortDir: string = 'desc';
  sortColumn: any = 'CreatedOn';

  zoneSortDir: string = 'asc';
  zoneSortColumn: any = 'Priority';

  ZoneCount: number = 0;
  ZonePageNo: number = 1;
  lstZone: any = {
    pager: {},
    data: []
  }

  campaignMemberPageNo: number = 1;
  AppointmentPageNo: number = 1;
  AbcensePageNo: number = 1;
  CrewPageNo: number = 1;

  customCompnentValuesTop: any;
  checkboxdataTop: Array<CheckboxData> = [];
  siteurl: string = '';
  contentHeader: object;
  constructor(
    private projectService: ProjectService,
    private router: Router, private dialogService: ConfirmationDialogService,
    private route: ActivatedRoute, private toaster: ToastrService, private commonService: CommonService, private location: Location) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  checkboxdata1: Array<CheckboxData> = [];


  ngOnInit() {
    this.siteurl = window.location.origin;
    // console.log('siteurl', this.siteurl);
    this.loadSave = true;
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.Id = id;
      })
    this.getOperatorList();
    this.GetCustomFieldsList();
    this.getRelatedData();
  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Projects',
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
             name : 'Manage Projects',
             isLink : true,
             link : '/projects'
           },
           {
             name: 'Project Details',
             isLink: false
           }
  
         ]
     };
   }


  getRelatedData() {
  
  }

  close() {
    this.router.navigateByUrl("/serviceresource");
  }
  GetCustomFieldsList() {
    this.displayType = "VIEW";
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = result.data;
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
        });

        //******************  merge groups and additional groups start here **********//
        if (this.additionalGroups) {
          this.additionalGroups.forEach(item => {

            let _object = {
              group_id: item.group_id,
              group_name: item.group_name,
              group_display_name: item.group_display_name,
              InnerData: [],
              visibility_condition: item.visibility_condition,
              visibility_condition_label: item.visibility_condition_label,
              IsVisible: true,
              default_value: (item.default_value) ? item.default_value : '',
              layout_type: (item.layout_type) ? item.layout_type : '',
              group_display_order: item.display_order
            };

            if (item.group_layout_type === 'textarea') {
              this.formControlList.push(_object);
            } else if (item.group_layout_type === 'textAreaTop') {
              this.groupTop.push(_object);
            }
          });
          this.formControlList.sort((a, b) => (a.group_display_order > b.group_display_order) ? 1 : -1);

          if (this.groupTop) {
            this.groupTop.sort((a, b) => (a.group_display_order > b.group_display_order) ? 1 : -1);

            this.groupTop.forEach((item, index) => {
              if (item.visibility_condition_label) {
                item.visibility_condition_label = (item.visibility_condition_label) ? JSON.parse(item.visibility_condition_label) : null;
                item.IsVisible = this.GetVisibilityDecision(item.visibility_condition_label);
              }
            });
          }
        }
        //******************  merge groups and additional groups end here **********//

        this.formControlList.forEach((item, index) => {
          if (item.visibility_condition_label) {
            item.visibility_condition_label = (item.visibility_condition_label) ? JSON.parse(item.visibility_condition_label) : null;
            item.IsVisible = this.GetVisibilityDecision(item.visibility_condition_label);
          }
        });
        const group: any = {};
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.ColumnName == 'Name') {
            this.ProjectName = cnt.value;
          }
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? 'checked' : null;
          }
          else {
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
          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
                else {
                  
                }
              });
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
       
      }
    },
      err => {
        this.loadSave = false;
      },
      () => {
        //this.getRelatedTabData();
        this.getRelatedObjects();
        setTimeout(() => {
          this.loadSave = false;
        }, 3000);
      });
  }

  GetCustomFieldsListTopRow() {
    this.displayType = 'VIEW_TOP';
    this.loadSave = true;
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(resp => {
      if (resp) {
        this.customCompnentValuesTop = resp.data;
        this.customCompnentValuesTop.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdataTop.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdataTop.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }

          //if (cnt.ColumnName == 'Name') {
          //  this.ProjectName = cnt.value;
          //}


          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
              });
            }
          }
        });
      }
    },
      err => {
        this.loadSave = false;
      },
      () => {
        this.loadSave = false
      });
  }






  OnBackToListClick() {
    this.location.back();
  }

  subscriber = new Subject()
  operatorList: any;
  relatedObjects: any[] = [];
  groupTop: any[] = [];
  additionalGroups: any[];
  getRelatedObjects() {
    this.commonService.GetRelatedObjects(this.moduleName, this.submoduleName, this.Id, "", "")
      .pipe(takeUntil(this.subscriber))
      .subscribe(resp => {
        if (resp) {
          this.relatedObjects = resp["dataRelated"] as [];
          this.relatedObjects.forEach((item, index) => {
            if (item.visibility_condition_json) {
              item.visibility_condition_json = (item.visibility_condition_json) ? JSON.parse(item.visibility_condition_json) : null;
              item.IsVisible = this.GetVisibilityDecision(item.visibility_condition_json);
            }
          });
        } else {
          this.commonService.ShowError();
          this.loadSave = false;
        }
      }, error => {
        this.commonService.ShowError();
        this.loadSave = false;
      }, () => {
        this.loadSave = false;
      });
  }
  getOperatorList() {
    this.commonService.getOperatorsList('-1').toPromise()
      .then((res) => {
        this.operatorList = this.commonService.operator;
      })
      .catch((error) => {  console.log(error) });
  } GetVisibilityDecision(jsonData: any) {
    try {
      ;
      let result: any[] = [];
      var json = this.commonService.TryJsonParse(jsonData);
      json.forEach((field: fieldsJson, index) => {

        let values = this.customCompnentValues.filter(column => column.custom_field_id == field.column_name)[0].ref_value;
        let expression = this.commonService.GetOperatorExpression(field.operatorId, this.operatorList);

        if (expression == "==") {
          result.push(field.value.includes(values) ? true : false);
        }
        else if (expression == "!=") {
          result.push(field.value.includes(values) ? false : true);
        }

        //// console.log("result", result);
      });

      let finalDecision = true;
      if (json.length > 1) {
        let data: string[] = json.map((field: fieldsJson) => field.extended_operator).filter((value, index, self) => self.indexOf(value) == index && value != "") as [];

        if (data.length <= 1) {
          let operator = (data[0]) ? data[0] : "";
          if (operator.toLowerCase() === "or") {
            let _filterResult = result.filter(resp => resp == true);
            if (_filterResult.length > 0) {
              finalDecision = true;
            } else {
              finalDecision = false;
            }
          }
          else if (operator.toLowerCase() === "and") {
            let _data = result.filter((value, index) => result.indexOf(value) == index) as any[];

            if (_data.length) {
              if (_data.length == 1) {
                if (_data[0] === false) {
                  finalDecision = false;
                }
                else {
                  finalDecision = true;
                }
              }
              else {
                finalDecision = false;
              }
            }
          }
        }
      }
      else {
        finalDecision = result[0];
      }
      return finalDecision;
    }
    catch (e) {
      return true;
      // console.log(e);
    }
  }
  addItem(newItem: boolean) {

    if (newItem) {
      this.GetCustomFieldsList();
    }
  }
}
