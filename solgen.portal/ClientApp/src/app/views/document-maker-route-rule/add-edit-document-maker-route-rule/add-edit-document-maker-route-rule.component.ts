import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { AddNewFieldRouteData, Condition, DocumentMakerRouteRuleService, RouteData, RouteRule } from '../document-maker-route-rule.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-edit-document-maker-route-rule',
  templateUrl: './add-edit-document-maker-route-rule.component.html',
  styleUrls: ['./add-edit-document-maker-route-rule.component.scss']
})
export class AddEditDocumentMakerRouteRuleComponent implements OnInit {
  pageTitle: string;
  loadSave = false;
  disabledCondtion= false;
  dataRoutingForm: FormGroup;
  data: FormData;
  dataRouteId: any;
  active: boolean;
  addNewFieldRule:any;
  bankId: any;
  webmergeDocuments: any[] = [];
  action: string = "Add";
  dataRouteRequestModel: RouteData;
  AddNewFielddataRouteModel: AddNewFieldRouteData;
  oldDataRouteRequestModel: RouteData;
  documentFields: string[] = [];
  expressions = [
    { value: '==', name: '= Equals' },
    { value: '!=', name: '!= Does Not Equal' },
    { value: '<', name: 'Less than' },
    { value: '<=', name: 'Less or Equal to' },
    { value: '>', name: 'Greater than' },
    { value: '>=', name: 'Greater than Equal to' },
    { value: 'contains', name: 'Contains' },
    { value: '!contains', name: 'Does Not Contain' }
  ];

  operators = [
    //{ value: 'noaction', name: 'Add Condition' },
    { value: 'and', name: 'And' },
    { value: 'or', name: 'Or' }
  ];
  workStatus: any[] = [
    { value: 1001, text: 'Active' },
    { value: 1002, text: 'In-Active' },
  ];

  id: any;
  addEditForm: FormGroup;
  documentList: any[];
  logicalOperatorList: any[] = [{ text: 'AND', value: '1' }, { text: 'OR', value: '2' }];
  placeHolderFieldsList: any[];
  comparisonOperatorList: any[];
  searchText: string = '';
  length: number = 0;
  routeRules: RouteRule[] = [];
  @ViewChild("routeRuleForm", { static: false }) routeRuleForm: NgForm;
  @ViewChild('AddnewFieldModal',{ static: false }) AddnewFieldModalpopup: ModalDirective;
  contentHeader: object;
  constructor(private fb: FormBuilder,
    private service: DocumentMakerRouteRuleService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private dialogService: ConfirmationDialogService
    ) { }

  ngOnInit() {
    this.dataRouteRequestModel = new RouteData();
    this.AddNewFielddataRouteModel=new AddNewFieldRouteData();
    this.oldDataRouteRequestModel = new RouteData();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.pageTitle = "Edit Route/Rule";
        this.action = "Update";
        this.GetDocumentList(false);
        this.service.getRoutesData(this.id).subscribe(resp => {
          this.dataRouteRequestModel.id = resp.id;
          this.dataRouteRequestModel.statusid = JSON.parse(resp.statusid);
          this.oldDataRouteRequestModel.id = resp.id;
          this.dataRouteRequestModel.name = resp.name;
          if(resp.MappingRouteStatus)
          {
            if(resp.MappingRouteStatus=="RouteAvailable")
            this.disabledCondtion=true;
          }
          this.oldDataRouteRequestModel.name = resp.name;
          this.service.getRouteRulesData(this.id).subscribe(rules => {
            rules.forEach(r => {
              r.document_id = r.document_id ? JSON.parse(r.document_id) : null;
              r.deleted = false;
              debugger
              this.getDocumentFields(r);
              if (r.conditions != null) {

                r.conditions = r.conditions.map(c => {
                  c.field = c.field ? JSON.parse(c.field) : null;
                  c.deleted = false;
                  return c;
                })
              }
              this.oldDataRouteRequestModel.rules.push(r);
            });
            if (rules != null) {
              this.dataRouteRequestModel.rules = rules.sort((r1, r2) => r1.sort - r2.sort).map(r => {
                r.deleted = false;
                if (r.conditions != null) {
                  r.conditions = r.conditions.map(c => {
                    c.deleted = false;
                    return c;
                  })
                }
                return r;
              });
            }
          });
        });
      } else {
        this.pageTitle = "Add Route/Rule";
        this.action = "Add";
        this.GetDocumentList(true);
      }
    });
    this.initBreadCrumb();
  }
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Document Route/Rule',
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
            name : 'Document Route/Rule',
            isLink : true,
            link : '/document-maker-routerule'
          },
          {
            name: this.pageTitle,
            isLink: false
          }
  
        ]
    };
  }
  GetDocumentList(init: boolean = false) {
    this.loadSave = true;
    this.service.getDocumentList().subscribe((resp : any )=> {
      this.loadSave = false;
      this.documentList = resp;
      // this.documentList.forEach(document => {
      //   // this.getDocumentFields(document.value);
      // })
      if (init) {
        this.dataRouteRequestModel.rules.push({ combine: 1, conditions: [new Condition()], document_id: null, moduleId: 0, subModuleId : 0, id: 0, sort: 1, document_name: null, key: null, deleted: false, fieldList : [] });

      }
    }, err => {
      this.loadSave = false;
    });
  }
  AddNewFieldpopup(rule:any)
  {
    this.AddNewFielddataRouteModel=new AddNewFieldRouteData();
    this.addNewFieldRule=rule;
    this.AddnewFieldModalpopup.show();
  }

  checkRuleLength()
  {
    if (this.dataRouteRequestModel.rules.filter(o => o.deleted ==false).length > 1) 
      return true;
      else
      return false;
  }


  close()
  {
   // this.AddNewFielddataRouteModel=null;
    this.AddnewFieldModalpopup.hide();
  }
  getDocumentFields(rule : any) {
    this.loadSave = true;
    this.service.getPlaceHolderFieldsList(rule.document_id.value).subscribe((documentFields : any )=> {
      this.loadSave = false;
      // this.documentFields = this.documentFields.concat(documentFields.map(field => {
      //   return field;
      // }));
      debugger
      rule.fieldList = documentFields.map(field => {
        return field;
      });
    }, err => {
      this.loadSave = false;
    });
  }

  onDocumentChange(event, rule) {
    this.dataRouteRequestModel.rules.forEach(r => {
      if (r.id == rule.id) {
        r.document_id = event.id;
      }
    })
  }

  onCombineChanged(rule) {
    this.dataRouteRequestModel.rules.forEach(r => {
      if (r.id == rule.id) {
        if (r.combine == 0) {
          r.combine = 1;
        } else {
          r.combine = 0;
        }
      }
    });
  }

  addNewRule() {
    let sort=0;
    this.dataRouteRequestModel.rules.forEach((r, index) => {
      if (r.deleted == false) {
        sort = sort+1
      }
    });
    let id = 0 - this.dataRouteRequestModel.rules.length;
    this.dataRouteRequestModel.rules.push({ combine: 1, conditions: [new Condition()], document_id: null, moduleId: 0, subModuleId : 0, id: id, sort:   sort + 1, document_name: null, key: null, deleted: false, fieldList : [] });
  }

  deleteRule(rule) {
    let sort=0;
    this.dataRouteRequestModel.rules.forEach((r, index) => {
    
      if (r.id == rule.id) {
        //this.dataRouteRequestModel.rules.splice(index, 1);
        r.deleted = true;
      }

      if (r.deleted == false) {
        //this.dataRouteRequestModel.rules.splice(index, 1);
        r.sort = sort+1;
        sort = sort+1
      }

    });   
  }

  onChange(ctrl: ElementRef, event, rule) {
    if (event.target.value == "Add") {
      //do nothing
    } else {
      this.addNewCondition(rule, event.target.value);
       (<any>ctrl).value = "Add";
    }
  }

  addNewCondition(rule, event: string) {
    this.dataRouteRequestModel.rules.forEach((r, index) => {
      if (r.id == rule.id) {
        if (r.conditions == null) {
          r.conditions = [];
        }
        r.conditions.push({ operator: event.toLowerCase(), exp: null, field: null, value: null, deleted: false })
      }
    });
  }

  deleteCondition(rule, condition) {
    this.dataRouteRequestModel.rules.forEach(r => {
      if (r.id == rule.id) {
        r.conditions.forEach((c, index) => {
          if (c == condition) {
            //r.conditions.splice(index, 1);
            c.deleted = true;
          }
        })
      }
    });
  }
  saveNewField(){
    if(this.AddNewFielddataRouteModel.name !=null && this.AddNewFielddataRouteModel.name)
    {
      this.AddNewFielddataRouteModel.document_id =this.addNewFieldRule.document_id.value;
      this.AddNewFielddataRouteModel.name = this.AddNewFielddataRouteModel.name !=null && this.AddNewFielddataRouteModel.name !=''?this.AddNewFielddataRouteModel.name + '_Custom' : '';
      this.service.AddNewFieldRouteData(this.AddNewFielddataRouteModel).subscribe(resp => {
        this.toaster.success("New Field added successfully");
       // this.AddNewFielddataRouteModel= null;

        this.AddnewFieldModalpopup.hide();
        this.getDocumentFields(this.addNewFieldRule);
      }, err => {

      })
    }
    else{
      this.toaster.error("Please add field name");
    }

  }
  save() {
    if(this.routeRuleForm.valid){
      this.loadSave = true;
      this.dataRouteRequestModel.statusiddb = this.dataRouteRequestModel.statusid.value;
      this.service.VerifyDuplicateName(this.dataRouteRequestModel.name, this.dataRouteRequestModel.id).subscribe(resullt=>{
        if(resullt == 1){
          this.toaster.error("Route/Rule is already exist with same name. Please enter another name.");
          this.loadSave = false;
        }
        else{
          if (this.action == "Add") {
            this.dataRouteRequestModel.rules.forEach(rule =>{
              if(rule.document_id){
                let documentobj = rule.document_id;
                rule.document_id =  documentobj.value;
                rule.moduleId = documentobj.ModuleId;
                rule.subModuleId = documentobj.SubModuleId;
                rule.conditions.forEach(condition =>{
                  if(condition.field){
                    condition.field =  condition.field.value;
                  }
                });
              }
            });
            this.service.AddRouteData(this.dataRouteRequestModel).subscribe(resp => {
              this.loadSave = false;
              this.toaster.success("Route/Rule has been added successfully.");
              this.router.navigateByUrl("/document-maker-routerule");
            }, err => {
              this.loadSave = false;
            })
          } else if (this.action == "Update") {
            this.dataRouteRequestModel.rules.forEach(rule => {
              let isRuleNew = true;
              if(rule.document_id){
                let documentobj = rule.document_id;
                rule.document_id =  documentobj.value
                rule.moduleId = documentobj.ModuleId,
                rule.subModuleId = documentobj.SubModuleId
                rule.conditions.forEach(condition =>{
                  if(condition.field){
                    condition.field =  condition.field.value;
                  }
                });
              }
              if (this.oldDataRouteRequestModel.rules.filter(o => o.id == rule.id).length > 0) {
                isRuleNew = false;
              }
            })
            this.service.updateRouteData(this.dataRouteRequestModel).subscribe(resp => {
              this.loadSave = false;
              this.toaster.success("Route/Rule has been updated successfully.");
              this.router.navigateByUrl("/document-maker-routerule");
            }, err => {
              this.loadSave = false;
            })
          }
        }
      })

    }

  }


  // ngOnInit() {
  //   this.initForm();
  //   this.getDocumentsList();
  //   // this.onDocumentChange();
  //   this.getComparisonOperators();
  //   this.route.paramMap.subscribe(params => {
  //     this.id = params.get('id');
  //     if (this.id) {
  //       this.pageTitle = "Edit Route/Rule";
  //     }else{
  //       this.pageTitle = "Add Route/Rule";
  //     }
  //   });
  // }
  // initForm(){
  //   this.addEditForm = this.service.buildRootRouteRule(null);
  // }
  // EditForm(){
  //   this.addEditForm = this.service.buildRootRouteRule(this.routeRules);
  // }
  // onDocumentChange(event,i) {
  //   if(event){
  //     this.routeRuleConditions(i).reset();
  //     this.routes.controls[i].get('moduleId').setValue(event.ModuleId);
  //     this.routes.controls[i].get('subModuleId').setValue(event.SubModuleId);
  //     this.getPlaceHolderFieldsList(event.value,i);
  //   }
  // }
  // getDocumentsList() {
  //     return this.service.getDocumentList(this.length,this.searchText).subscribe((m: any) => {
  //       if(m){
  //         this.documentList = m;
  //       }
  //     });
  // }
  // getComparisonOperators(){
  //   return this.service.getComparisionOperatorsList("Comparison").subscribe((m: any) => {
  //     if(m){
  //       this.comparisonOperatorList = m;
  //     }
  //   });
  // }
  // getPlaceHolderFieldsList(documentId: number,index: number){
  //   return this.service.getPlaceHolderFieldsList(documentId,this.length,this.searchText).subscribe((m: any) => {
  //     if(m){
  //       this.placeHolderFieldsList = m;
  //       this.routes.controls[index].get('documentMakerPlaceHolderFieldIdsList').setValue(m);
  //     }
  //   });
  // }
  // onScrollToEnd(dataList: any, index: number,dropdowntype:string,control : FormControl= null) {
  //   this.fetchMore(dataList, index,dropdowntype,control);
  // }
  // private fetchMore(dataList: any, index: number,dropdowntype:string,control : FormControl= null) {
  //   if (this.searchText == undefined) {
  //     this.searchText = '';
  //   }
  //   this.length = dataList.length;
  //   if(dropdowntype == 'Document'){
  //     this.service.getDocumentList(this.length, this.searchText).subscribe((res: any) => {
  //       (dataList as any[]) = (dataList as any[]).concat(res);
  //       });
  //   }else{
  //     this.service.getPlaceHolderFieldsList(this.documentId(index).value.value,this.length, this.searchText).subscribe((res: any) => {
  //       (dataList as any[]) = (dataList as any[]).concat(res);
  //       });
  //   }
  //   if(control){
  //     control.setValue(dataList);
  //   }
  // }

  // onKey(e: any, dataList: any, j: number,dropdowntype:string,control : FormControl= null) {
  //   this.length = 0
  //   this.searchText = e.target.value;
  //   if(dropdowntype == 'Document'){
  //     this.service.getDocumentList(this.length, this.searchText).subscribe((res: any) => {
  //       (dataList as any[]) = res;
  //     });
  //   }else{
  //     this.service.getPlaceHolderFieldsList(this.documentId(j).value.value,this.length, this.searchText).subscribe((res: any) => {
  //       (dataList as any[]) = (dataList as any[]).concat(res);
  //       });
  //   }
  //   if(control){
  //     control.setValue(dataList);
  //   }
  // }

  // onClearLang(dataList: any, j: number,dropdowntype:string,control : FormControl= null): void {
  //   this.length = 0
  //   this.searchText = '';
  //   if(dropdowntype == 'Document'){
  //     this.service.getDocumentList(this.length, this.searchText).subscribe((res: any) => {
  //       (dataList as any[]) = res;
  //     });
  //   }else{
  //     this.service.getPlaceHolderFieldsList(this.documentId(j).value.value,this.length, this.searchText).subscribe((res: any) => {
  //       (dataList as any[]) = (dataList as any[]).concat(res);
  //       });
  //   }
  //   if(control){
  //     control.setValue(dataList);
  //   }
  // }

  // save() {
  //   if (this.addEditForm.valid) {
  //     this.loadSave = true;
  //     let finalValues = this.saveMap();
  //         this.service.AddUpdateRouteRule(finalValues).subscribe((result: any) => {
  //           if (result.statusCode == 200) {
  //             this.toaster.success(result.responseMessage);
  //             this.loadSave = false;
  //             this.router.navigateByUrl("/solgen-rule-engine");

  //           } else {
  //             this.loadSave = false;
  //             this.toaster.error(result.responseMessage);
  //           }
  //         });
  //       }
  // }
  // saveMap(){

  //   return this.addEditForm.value.routeRuleArray.map((t, index) =>{
  //     return {
  //       id: t.id,
  //       name: t.name,
  //       moduleId: t.moduleId,
  //       subModuleId: t.subModuleId,
  //       documentMakerId: (t.documentMakerId && t.documentMakerId.value ) ? t.documentMakerId.value : null,
  //       routeRuleConditions: t.routeRuleConditions.map((c, cIndex) => {
  //         return {
  //           id: c.id,
  //           documentMakerRouteRuleId: c.documentMakerRouteRuleId,
  //           logicalOperator: (c.logicalOperator && c.logicalOperator.value) ? c.logicalOperator.value : null,
  //           documentMakerPlaceHolderFieldId: (c.documentMakerPlaceHolderFieldId &&  c.documentMakerPlaceHolderFieldId.value) ? c.documentMakerPlaceHolderFieldId.value : null,
  //           ComparisonOperator:  (c.ComparisonOperator && c.ComparisonOperator.operatorId) ? c.ComparisonOperator.value : null,
  //           value: c.value,
  //         }
  //       }),
  //     }
  //   });

  // }
  // resetRouteRule(index){

  // }
  // addCondition(rowindex){
  //   this.routeRuleConditions(rowindex).push(this.service.buildRouteRuleConditions());
  // }
  // removeCondition(rowindex,conditionindex) {
  //   this.routeRuleConditions(rowindex).removeAt(conditionindex);
  // }
  //  routeRuleConditions(index) {
  //   return this.routes.controls[index].get('routeRuleConditions') as FormArray;
  // }
  // documentId(rowindex) {
  //   return this.routes.controls[rowindex].get('documentMakerId');
  // }
  // addRouteRule(){
  //    this.routes.push(this.service.buildRouteRule(null));
  // }
  // removeRouteRule(index : number){
  //   this.routes.removeAt(index);
  // }
  // get routes(){
  //   return this.addEditForm.get('routeRuleArray') as FormArray;
  // }
}
