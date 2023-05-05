import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { WebmergeDataRoute, LenderlistService } from '../lenderlist.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-data-routing',
  templateUrl: './data-routing.component.html',
  styleUrls: ['./data-routing.component.scss']
})
export class DataRoutingComponent implements OnInit {

  loadSave = false;
  dataRoutingForm: FormGroup;
  data: FormData;
  dataRouteId: any;
  active: boolean;
  bankId: any;
  webmergeDocuments: any[] = [];
  action: string = "Add";
  dataRouteRequestModel: WebmergeDataRoute;
  oldDataRouteRequestModel: WebmergeDataRoute;

  webmergeDocumentFields: string[] = [];

  @ViewChild('dataRouting', { static: false }) dataRouting: ModalDirective;
  @Output() dataRoutingEmit = new EventEmitter();

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

  constructor(private lenderListService: LenderlistService, private toastr: ToastrService) { }

  ngOnInit() {
    this.dataRouteRequestModel = new WebmergeDataRoute();
    this.oldDataRouteRequestModel = new WebmergeDataRoute();
  }

  show(dataRouteId: any, bankId: any) {
    this.dataRouteId = dataRouteId;
    this.bankId = bankId;

    if (dataRouteId == '') {
      this.action = "Add";
      this.getWebmergeDocumentsByBankId(bankId, true);
    } else {
      this.action = "Update";
      this.getWebmergeDocumentsByBankId(bankId, false);
      this.lenderListService.getWebmergeDataRoute(dataRouteId).subscribe(resp => {
        this.dataRouteRequestModel.id = resp.id;
        this.oldDataRouteRequestModel.id = resp.id;

        this.dataRouteRequestModel.name = resp.name;
        this.oldDataRouteRequestModel.name = resp.name;

        this.dataRouteRequestModel.folder = resp.folder;
        this.oldDataRouteRequestModel.folder = resp.folder;

        this.dataRouteRequestModel.BankId = resp.BankId;
        this.oldDataRouteRequestModel.BankId = resp.BankId;

        this.lenderListService.getWebmergeDataRouteRules(dataRouteId).subscribe(rules => {          
          rules.forEach(r => {
            r.deleted = false;
            if (r.conditions != null) {
              r.conditions = r.conditions.map(c => {
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
    }
    this.dataRouting.show();
  }

  close() {
    this.active = false;
    this.dataRouteRequestModel = new WebmergeDataRoute();
    this.dataRouting.hide();
    this.dataRoutingEmit.emit();
  }

  getWebmergeDocumentsByBankId(bankId: any, init: boolean = false) {
       this.loadSave = true;
    setTimeout(() => { 
    this.lenderListService.getWebmergeDocuments(bankId).subscribe(resp => {
      this.loadSave = false;
      this.webmergeDocuments = resp;
      this.webmergeDocuments.forEach(document => {
        this.getWebmergeDocumentFields(document.id);
      })

      if (init) {
        //this.webmergeDocuments.forEach((document, index) => {
        //  this.dataRouteRequestModel.rules.push({ combine: 0, conditions: [], document_id: null, id: index + '', sort: index + 1, document_name: null, key: null });
        //});
        this.dataRouteRequestModel.rules.push({ combine: 0, conditions: [], document_id: null, id: 0, sort: 1, document_name: null, key: null, deleted: false });
        }
      this.loadSave = false;
    }, err => {
      this.loadSave = false;
    });
    }, 1000);
    
  }

  getWebmergeDocumentFields(documentId: any) {
    
    this.loadSave = true;
    this.lenderListService.getWebmergeDocumentFields(documentId).subscribe(documentFields => {
      this.loadSave = false;
      this.webmergeDocumentFields = this.webmergeDocumentFields.concat(documentFields.map(field => {
        //return '{$' + field + '}';
        return field;
      }));
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
    let id = 0 - this.dataRouteRequestModel.rules.length;
    this.dataRouteRequestModel.rules.push({ combine: 0, conditions: [], document_id: null, id: id, sort: this.dataRouteRequestModel.rules.length + 1, document_name: null, key: null, deleted: false });
  }

  deleteRule(rule) {
    this.dataRouteRequestModel.rules.forEach((r, index) => {
      if (r.id == rule.id) {
        //this.dataRouteRequestModel.rules.splice(index, 1);
        r.deleted = true;
      }
    });
  }

  onChange(ctrl: ElementRef, event, rule) {    
    if (event.target.value == "Add") {
      //do nothing
    } else {
      this.addNewCondition(rule, event.target.value);
      ctrl.nativeElement.value = "Add";
    }
  }

  addNewCondition(rule, event: string) {
    this.dataRouteRequestModel.rules.forEach((r, index) => {
      if (r.id == rule.id) {
        if (r.conditions == null) {
          r.conditions = [];
        }
        r.conditions.push({ operator: event.toLowerCase(), exp: '', field: '', value: '', deleted: false })
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

  submit() {
    
    this.loadSave = true;
    if (this.action == "Add") {
      this.lenderListService.createWebmergeDataRoute(this.dataRouteRequestModel, this.bankId).subscribe(resp => {
        this.loadSave = false;
        this.toastr.success("Data Route added successfully");
        this.close();
      }, err => {
        this.loadSave = false;
      })
    } else if (this.action == "Update") {
      this.dataRouteRequestModel.rules.forEach(rule => {
        let isRuleNew = true;

        if (this.oldDataRouteRequestModel.rules.filter(o => o.id == rule.id).length > 0) {
          isRuleNew = false;
        }

        //if (isRuleNew) {
        //  rule.id = null;
        //}
      })
      this.lenderListService.updateWebmergeDataRoute(this.dataRouteRequestModel).subscribe(resp => {
        this.loadSave = false;
        this.toastr.success("Data Route updated successfully");
        this.close();
      }, err => {
        this.loadSave = false;
      })
    }
  }
}
