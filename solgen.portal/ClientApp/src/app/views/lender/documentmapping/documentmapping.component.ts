import { Component, OnInit, ViewChild, Output, EventEmitter, Input, Inject, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { LenderlistService, WebmergeDocumentField, FormField, WebmergeMapping } from '../lenderlist.service';
import { retry } from 'rxjs/operators';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-documentmapping',
  templateUrl: './documentmapping.component.html',
  styleUrls: ['./documentmapping.component.scss']
})
export class DocumentmappingComponent implements OnInit {

  document: any;
  webmergeMappingId: any;
  bankId: any;
  loadSave = false;
  webmergeDocument: any;
  webmergeMapping: WebmergeMapping = new WebmergeMapping();
  webmergeDocuments: any[] = [];
  webmergeDataRoutes: any[] = [];

  @ViewChild('documentMapping', { static: false }) documentMapping: ModalDirective;
  @Output() documentMappings = new EventEmitter();
  active = false;
  modulePermission: ModuleList;

  webmergeDocumentFields: WebmergeDocumentField[] = [];
  prevWebmergeDocumentFields: WebmergeDocumentField[] = [];
  formFields: FormField[] = [];

  selectedObjectId: any;

  constructor(private fb: FormBuilder,
    private router: Router, private commonService: CommonService,
    private toaster: ToastrService,
    private lenderService: LenderlistService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    //this.document.name = '';
    //this.document.folder = '';
  }

  show(bankId: any, webmergeMappingId: any) {
    debugger;
    this.bankId = bankId;
    this.webmergeMappingId = webmergeMappingId;
    this.loadSave = true;    
    this.getWebmergeDocuments(bankId);
    this.getWebmergeDataRoutes(bankId);

    if (webmergeMappingId == 0) {
      //Create
    } else {
      //Update
      this.getWebmergeMapping(bankId, webmergeMappingId);
    }

    this.documentMapping.show();
  }

  private getWebmergeDocuments(bankId) {
    this.loadSave = true;
    this.lenderService.getWebmergeDocuments(bankId).subscribe(documents => {
      this.loadSave = false;
      this.webmergeDocuments = documents;
    }, err => {
      this.loadSave = false;
    });
  }

  private getWebmergeDataRoutes(bankId) {
    this.loadSave = true;
    this.lenderService.getWebmergeDataRoutes(bankId).subscribe((dataRoutes:any) => {
      this.loadSave = false;
      this.webmergeDataRoutes = dataRoutes;
    }, err => {
      this.loadSave = false;
    })
  }

  private getWebMergeDocument(documentId) {
    this.lenderService.getWebmergeDocument(documentId).subscribe(doc => {
      this.webmergeDocument = doc;
    });
  }

  private getWebmergeMapping(bankId, mappingId) {
    this.loadSave = true;
    this.lenderService.getWebmergeMappingDetails(bankId, mappingId).subscribe(webmergeMapping => {
      this.loadSave = false;
      this.webmergeMapping = webmergeMapping;

      this.getFormFields();

    }, err => {
        this.loadSave = false;
    });
  }

  private getFormFields() {
    this.loadSave = true;
    this.lenderService.getFormFields().subscribe(formFields => {
      this.loadSave = false;
      this.formFields = formFields;
      if (this.webmergeMapping.webmergeObjectType == 'Document') {
        this.getWebmergeFields(this.webmergeMapping.webmergeObjectId);
      } else if (this.webmergeMapping.webmergeObjectType == 'Route') {
        this.lenderService.getWebmergeDataRouteRules(this.webmergeMapping.webmergeObjectId).subscribe(rules => {
          rules.forEach(rule => {
            this.getWebmergeFields(rule.document_id);
          });
        });
      }
    }, err => {
      this.loadSave = false;
    });
  }

  private getWebmergeFields(documentId: any) {
    this.loadSave = true;

    //
    this.lenderService.getWebmergeDocument(documentId).subscribe(doc => {
      this.webmergeDocuments.push(doc);
      this.lenderService.getWebmergeDocumentFields(documentId).subscribe(documentFields => {
        this.loadSave = false;
        documentFields.forEach(item => {
          this.webmergeDocumentFields.push({ webmergeDocumentFieldName: item, webmergeDocumentName: doc.name, mappings: [] });
        });
        this.getWebmergeMappings(doc);
      }, err => {
        this.loadSave = false;
      });
    });

    
  }

  private getWebmergeMappings(document: any) {
    this.loadSave = true;
    this.webmergeMapping.webmergeMappings.forEach(dbMapping => {
      this.webmergeDocumentFields.forEach(item => {
        if (dbMapping.webmergeDocumentFieldName == item.webmergeDocumentFieldName) {
          let properMapping = dbMapping.mappings.map(m => {
            let temp = this.formFields.filter(t => t.formFieldId == m.formFieldId);
            return temp[0];
          });
          item.mappings = properMapping;
          this.prevWebmergeDocumentFields.push({ webmergeDocumentFieldName: dbMapping.webmergeDocumentFieldName, webmergeDocumentName: document.name, mappings: properMapping });
        }
      });
    });

    if (this.webmergeMapping.webmergeObjectType == "Document") {      
      let obj = this.webmergeDocuments.filter(d => d.id == this.webmergeMapping.webmergeObjectId)[0];
      this.selectedObjectId = { name: obj.name, id: obj.id }
    } else if (this.webmergeMapping.webmergeObjectType == "Route") {
      let obj = this.webmergeDataRoutes.filter(d => d.id == this.webmergeMapping.webmergeObjectId)[0];
      this.selectedObjectId = { name: obj.name, id: obj.id }
    }

    this.loadSave = false;
  }

  //private getWebmergeMappings11(bankId: any, documentId: any) {
  //  this.loadSave = true;
  //  this.lenderService.getWebmergeMappings(bankId, documentId).subscribe(webmergeMappings => {
  //    webmergeMappings.forEach(dbMapping => {
  //      this.webmergeDocumentFields.forEach(item => {
  //        if (dbMapping.webmergeDocumentFieldName == item.webmergeDocumentFieldName) {
  //          let properMapping = dbMapping.mappings.map(m => {
  //            let temp = this.formFields.filter(t => t.formFieldId == m.formFieldId);
  //            return temp[0];
  //          });
  //          item.mappings = properMapping;
  //          this.prevWebmergeDocumentFields.push({ webmergeDocumentFieldName: dbMapping.webmergeDocumentFieldName, mappings: properMapping });
  //        }
  //      });
  //    });
  //    this.loadSave = false;
  //  }, err => {
  //    this.loadSave = false;
  //  });
  //}

  close() {
    this.active = false;
    this.webmergeMapping = new WebmergeMapping();
    this.webmergeDocuments = [];
    this.webmergeDataRoutes = [];
    this.webmergeDocumentFields = [];
    this.prevWebmergeDocumentFields = [];
    this.formFields = [];
    this.documentMappings.emit();
    this.documentMapping.hide();
  }

  submit() {
    let finalFields: WebmergeDocumentField[] = [];
    finalFields = this.webmergeDocumentFields.filter(item => item.mappings.length > 0);
    this.prevWebmergeDocumentFields.forEach(item => {
      if (finalFields.filter(final => final.webmergeDocumentFieldName == item.webmergeDocumentFieldName).length == 0) {
        item.mappings = [];
        finalFields.push(item);
      }
    });

    this.webmergeMapping.webmergeMappings = finalFields;

    if (this.webmergeMappingId == 0) {
      this.lenderService.saveWebmergeMapping(this.webmergeMapping, this.bankId).subscribe(resp => {
        if (resp.message == "success") {
          this.toaster.success("Mapping saved successfully");
          this.close();
        }
      });
    } else {
      this.lenderService.updateWebmergeMapping(this.webmergeMapping, this.bankId, this.webmergeMappingId).subscribe(resp => {
        if (resp.message == "success") {
          this.toaster.success("Mapping updated successfully");
          this.close();
        }
      });
    }
  }

  onChange(event: any, field: WebmergeDocumentField) {
    this.webmergeDocumentFields.forEach(docField => {
      if (docField == field) {
        docField.mappings = event;
      }
    });
  }

  selectWebmergeObjectType(event) {
    this.webmergeMapping.webmergeObjectType = event.target.value;
    this.clearFields();
    this.webmergeMapping.webmergeObjectId = 0;
    this.selectedObjectId = {};
  }

  onWebmergeObjectSelected(event) {
    this.selectedObjectId = { name: event.name, id: event.id };
    this.webmergeMapping.webmergeObjectId = event.id;
    this.clearFields();
    this.getFormFields();
  }

  private clearFields() {
    this.webmergeMapping.webmergeMappings = [];
    this.webmergeDocumentFields = [];
    this.prevWebmergeDocumentFields = [];
  }



  //remove(documentField: FormstackField, mapping:FormstackFieldMapping) {
  //  this.formstackFields.forEach(docField => {
  //    if (docField == documentField) {
  //      docField.mappings.forEach((item, index) => {
  //        if (item == mapping) {
  //          docField.mappings.splice(index, 1);
  //        }
  //      });
  //    }
  //  });
  //}

  //transferDataSuccess(data: any, formStackField: string) {
  //  // console.log("Dropped", data);
  //  this.formstackFields.forEach(item => {
  //    if (formStackField == item.formStackField) {
  //      let insertable: boolean = true;
  //      item.mappings.forEach(m => {
  //        if (m == data.dragData) {
  //          insertable = false;
  //        }
  //      });
  //      if (insertable) {
  //        item.mappings.push(data.dragData);
  //      }
  //    }
  //  });
  //  //alert(`${data.dragData} dropped`);
  //}

}
