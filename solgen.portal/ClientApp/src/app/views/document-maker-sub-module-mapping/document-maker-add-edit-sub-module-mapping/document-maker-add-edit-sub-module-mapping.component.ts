import { id } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { any } from 'underscore';
import { AddNewFieldRouteData, DocumentMakerRouteRuleService } from '../../document-maker-route-rule/document-maker-route-rule.service';
import { CommonService, JsonData, ModuleList } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { DocumentDeliveryOptions, DocumentMakerSubModuleMappingService, Documents, DocumentSubModuleMapping, DocumentSubModuleMappingField, FormField } from '../document-maker-sub-module-mapping.service';
import { EmailTemplateService, EmailTemplate } from '../../emailtemplate/emailtemplate.service';
import { eventsLoaded } from '@syncfusion/ej2-angular-schedule';
import { NgForm } from '@angular/forms';
import { CompanysetupserviceService } from '../../companysetup/companysetupservice.service';



@Component({
  selector: 'app-document-maker-add-edit-sub-module-mapping',
  templateUrl: './document-maker-add-edit-sub-module-mapping.component.html',
  styleUrls: ['./document-maker-add-edit-sub-module-mapping.component.scss']
})
export class DocumentMakerAddEditSubModuleMappingComponent implements OnInit {
  pageTitle: any;
  action: any;
  document: any;
  id: any = 0;
  loadSave = false;
  mapping: DocumentSubModuleMapping = new DocumentSubModuleMapping();
  DeliveryOptions: DocumentDeliveryOptions = new DocumentDeliveryOptions();
  @ViewChild("myckeditor", { static: false }) ckeditor: any;
  siteurl: string = '';
  documents: any[] = [];
  HtmlTemplist: any[] = [];
  dataRoutes: any[] = [];
  active = false;
  signer1 = false;
  signer2 = false;
  customCompnentValues: any = [];
  modulePermission: ModuleList;
  ckeConfig: any;
  subModulesList: any[];
  body: string;
  documentList: Documents[] = [];
  documentFields: DocumentSubModuleMappingField[] = [];
  prevdocumentFields: DocumentSubModuleMappingField[] = [];
  formFields: FormField[] = [];
  routeFormFields: DocumentSubModuleMappingField[] = [];
  statusList: any[] = [{ text: "Active", value: 1001 }, { text: "InActive", value: 1002 }]
  AddNewFielddataRouteModel: AddNewFieldRouteData;
  selectedObjectId: any;
  fieldType: any;
  addNewFieldRule: any;
  togglEmail: boolean = false;
  documentMappingFieldList: any;
  contentHeader: object;
  
  constructor(private service: DocumentMakerSubModuleMappingService,
    private router: Router,
    private toaster: ToastrService,
    public route: ActivatedRoute,
    private commonService: CommonService,
    private emailTemplateService: EmailTemplateService,
    private RouteRuleService: DocumentMakerRouteRuleService,
    private dialogService: ConfirmationDialogService,
    private companysetupserviceService: CompanysetupserviceService) { }
  @ViewChild('AddnewFieldModalMapping', { static: false }) AddnewFieldModalpopup: ModalDirective;
  @ViewChild("documentMappingForm", { static: false }) routeRuleForm: NgForm;
  ngOnInit() {
    this.documentMappingFieldList = [];
    this.siteurl = window.location.origin;
    // this.ckeConfig = {
    //   allowedContent: true,
    //   extraPlugins: 'divarea',
    //   forcePasteAsPlainText: true
    // };
    // this.ckeditor.instance.insertText('@' + "");
    this.mapping = new DocumentSubModuleMapping();
    this.DeliveryOptions = new DocumentDeliveryOptions();
    this.getsubModulesList();
    this.getDocuments();
    this.GetHtmlTemListForddl();
    this.getRoutes();

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.pageTitle = "Edit Document Mapping";
        this.action = "Update";
        this.getEditData(this.id);
        this.DeliveryOptions = new DocumentDeliveryOptions();
        this.FillEditorDataDelivery(0, this.id);
      } else {
        this.pageTitle = "Add Document Mapping";
        this.action = "Add";
      }
    });
    this.initBreadCrumb();

  }
  
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Document Mapping',
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
            name : 'Document Mapping',
            isLink : true,
            link : '/document-maker-submodule-mapping'
          },
          {
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
  }
  AddNewFieldpopup(rule: any, event: any) {
    this.AddNewFielddataRouteModel = new AddNewFieldRouteData();
    this.addNewFieldRule = rule;
    this.AddnewFieldModalpopup.show();
    event.preventDefault();
    event.stopPropagation();
  }
  close() {
    this.AddnewFieldModalpopup.hide();
  }
  saveNewField() {
    if (this.AddNewFielddataRouteModel.name != null && this.AddNewFielddataRouteModel.name) {
      this.AddNewFielddataRouteModel.document_id = this.addNewFieldRule;
      this.AddNewFielddataRouteModel.name = this.AddNewFielddataRouteModel.name != null && this.AddNewFielddataRouteModel.name != '' ? this.AddNewFielddataRouteModel.name + '_Custom' : '';
      this.RouteRuleService.AddNewFieldRouteData(this.AddNewFielddataRouteModel).subscribe(resp => {
        this.toaster.success("New Field added successfully");
        this.getSubModuleDocuments(this.addNewFieldRule);
        this.AddNewFielddataRouteModel = null;
        this.AddnewFieldModalpopup.hide();
      }, err => {

      })
    }
    else {
      this.toaster.error("Please add field name");
    }

  }
  getDocumentFields(rule: any) {

    this.loadSave = true;
    this.RouteRuleService.getPlaceHolderFieldsList(rule.document_id.value).subscribe((documentFields: any) => {
      this.loadSave = false;
      // this.documentFields = this.documentFields.concat(documentFields.map(field => {
      //   return field;
      // }));

      rule.fieldList = documentFields.map(field => {
        return field;
      });
    }, err => {
      this.loadSave = false;
    });
  }

  getDocumentFieldsFilter(docId: any) {
    //debugger
    return this.documentFields.filter(x => x.documentId == docId);
  }
  groupBy(list, keyGetter) {
    const map: DocumentSubModuleMappingField[] = [];
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.find(x => x.formFieldName == key);
      if (!collection) {
        map.push(item);
      } else {
        //  collection.push(item);
      }
    });
    return map;
  }
  // var groupBy = function(xs, key) {
  //   return xs.reduce(function(rv, x) {
  //     (rv[x[key]] = rv[x[key]] || []).push(x);
  //     return rv;
  //   }, {});
  // };
  deleteDocument(id: number) {

    // if (this.mapping.type == "Document") {
    this.selectedObjectId = null;
    this.mapping.objectId = null;
    this.onDocumentChange(this.selectedObjectId);
    // }
  }
  onStatusChange(event) {
    if (event) {
      this.mapping.statusIdDb = event.value;
    }
  }
  getsubModulesList() {
    this.loadSave = true;
    this.service.getSubModulesList().subscribe((modules: any) => {
      this.loadSave = false;
      this.subModulesList = modules;
    }, err => {
      this.loadSave = false;
    })
  }
  onSubModuleChange(event) {
    if (event) {
      this.mapping.moduleId = event.module_id;
      this.mapping.subModuleIdDb = event.sub_module_id;

      this.getCustomFields(event.module_id, event.sub_module_id);
    }
  }
  getCustomFields(moduleId: any, subModuleId: any) {
    this.loadSave = true;
    this.service.getCustomFieldsList(moduleId, subModuleId).subscribe((fields: any) => {

      this.loadSave = false;
      this.formFields = fields;
    }, err => {
      this.loadSave = false;
    });
  }
  getDocuments() {
    this.loadSave = true;
    this.service.getDocumentList().subscribe((documents: any) => {
      this.loadSave = false;
      this.documents = documents;
    }, err => {
      this.loadSave = false;
    });
  }
  GetHtmlTemListForddl() {
    this.loadSave = true;
    this.service.GetHtmlTemListForddl().subscribe((TempList: any) => {
      this.loadSave = false;
      this.HtmlTemplist = TempList;
    }, err => {
      this.loadSave = false;
    });
  }



  getRoutes() {
    this.loadSave = true;
    this.service.GetRoutesList().subscribe((routes: any) => {
      this.loadSave = false;
      this.dataRoutes = routes;
    }, err => {
      this.loadSave = false;
    });
  }
  onDocumentChange(event) {
    if (event) {
      this.mapping.objectId = event.value;
      this.clearFields();
      this.getSubModuleDocuments(event.value);

    } else {
      this.clearFields();
    }
  }

  onHtmlDocumentChange(event) {
    if (event) {
      this.mapping.objectId = event.value;
      this.clearFields();
      this.getSubModuleHTmlTempDocuments(event.value);

    } else {
      this.clearFields();
    }
  }



  onRouteChange(event) {
    if (event) {
      this.selectedObjectId = event;
      this.mapping.objectId = event.value;
      this.clearFields();
      this.getRouteDocuments(event.value);
    }
  }
  getRouteDocuments(routeId: any) {
    this.loadSave = true;
    this.service.GetRouteDocumentAndFieldsList(routeId).subscribe((routeDocument: any) => {
      this.loadSave = false;
      if (routeDocument && routeDocument.length > 0) {
        if (routeDocument[0].documents) {
          debugger
          this.documentList = JSON.parse(routeDocument[0].documents);
        }
        if (routeDocument[0].fields) {
          this.documentFields = JSON.parse(routeDocument[0].fields);
          this.routeFormFields = this.groupBy(JSON.parse(routeDocument[0].fields), a => a.formFieldName);
        }
      }
    }, err => {
      this.loadSave = false;
    });
  }
  getSubModuleDocuments(data: any) {
    this.loadSave = true;
    this.service.GetDocumentAndFieldsByDocumentIdsList(data).subscribe((routeDocument: any) => {
      this.loadSave = false;
      if (routeDocument && routeDocument.length > 0) {
        if (routeDocument[0].documents) {
          this.documentList = JSON.parse(routeDocument[0].documents);
        }
        if (routeDocument[0].fields) {
          this.documentFields = JSON.parse(routeDocument[0].fields)
        }
      }
    }, err => {
      this.loadSave = false;
    });
  }

  getSubModuleHTmlTempDocuments(data: any) {
    this.loadSave = true;
    this.service.GetHtmlTempAndFieldsByDocumentIdsList(data).subscribe((routeDocument: any) => {
      this.loadSave = false;
      if (routeDocument && routeDocument.length > 0) {
        if (routeDocument[0].documents) {
          this.documentList = JSON.parse(routeDocument[0].documents);
        }
        if (routeDocument[0].fields) {
          this.documentFields = JSON.parse(routeDocument[0].fields)
        }
      }
    }, err => {
      this.loadSave = false;
    });
  }




  getEditData(mappingId: any) {
    this.loadSave = true;
    this.service.getMapping(mappingId).subscribe((data: any) => {
      this.loadSave = false;
      if (data) {
        ;
        data.statusId = data.statusId ? JSON.parse(data.statusId) : null;
        data.documentList = data.documentList ? JSON.parse(data.documentList) : null;
        data.mappings = data.mappings ? JSON.parse(data.mappings) : null;
        data.subModuleId = data.subModuleId ? JSON.parse(data.subModuleId) : null;
        this.mapping = data;

        this.documentList = this.mapping.documentList;
        this.documentFields = this.mapping.mappings;
        this.routeFormFields = this.groupBy(this.mapping.mappings, a => a.formFieldName);
        this.documentMappingFieldList = this.mapping.mappings;
        if (this.mapping.type == "Document") {
          this.prevdocumentFields = this.mapping.mappings;
        } else {
          this.prevdocumentFields = this.groupBy(this.mapping.mappings, a => a.formFieldName);
        }

        this.selectedObjectId = this.mapping.objectId ? JSON.parse(this.mapping.objectId) : null;
        this.getCustomFields(this.mapping.moduleId, this.mapping.subModuleIdDb);
        this.routeFormFields.forEach(item => {

          if (item.mappings != null) {
            item.mappings.forEach(element => {
              this.customCompnentValues.push({ FieldKey: item.formFieldName, formFieldId: element.formFieldId, formFieldName: element.formFieldName });
            });
          }
        });


      }
    }, err => {
      this.loadSave = false;
    });
  }
  downloadFile(doc: any) {
    ;
   
    if(doc.type.toLowerCase()=="html")
    {      
      this.commonService.GetEcryptedId(doc.id).subscribe((result: any) => {
        if(result)
        {
          let Url = this.siteurl +"/proposal-document/"+encodeURIComponent(result)+"/local";
          window.open(Url);
          this.loadSave = false;
        }       
      });


    
    }
    else{
      this.loadSave = true;
      this.service.getDocumentBytes(doc.fileUrl).subscribe((bytes: any) => { //previously it was doc.path
        this.loadSave = false;
        var response = this.commonService.base64ToArrayBuffer(bytes);
        let file = new Blob([response], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        this.loadSave = false;
        window.open(fileURL);
      }, err => {
        this.loadSave = false;
      });
    }
  }

  private getMappings(document: any) {
    this.loadSave = true;
    this.mapping.mappings.forEach(dbMapping => {
      this.documentFields.forEach(item => {
        if (dbMapping.formFieldName == item.formFieldName) {
          let properMapping = dbMapping.mappings.map(m => {
            let temp = this.formFields.filter(t => t.formFieldId == m.formFieldId);
            return temp[0];
          });
          item.mappings = properMapping;
          this.prevdocumentFields.push({ formFieldName: dbMapping.formFieldName, documentId: document.documentId, documentName: document.name, mappings: properMapping });
        }
      });
    });

    if (this.mapping.type == "Document") {
      let obj = this.documents.filter(d => d.id == this.mapping.id)[0];
      this.selectedObjectId = { name: obj.name, id: obj.id }
    } else if (this.mapping.type == "Route") {
      let obj = this.dataRoutes.filter(d => d.id == this.mapping.id)[0];
      this.selectedObjectId = { name: obj.name, id: obj.id }
    }
    this.loadSave = false;
  }

  submit() { //Submit 1
    this.loadSave = true;
    let finalFields: DocumentSubModuleMappingField[] = [];
    this.service.VerifyDuplicateName(this.mapping.name, this.mapping.id).subscribe(result => {
      if (result == 1) {
        this.toaster.error("Document Mapping is already exist with same name. Please enter another name.")
        this.loadSave = false;
      }
      else {
        this.mapping.statusIdDb = this.mapping.statusId.value;
        if (this.mapping.type == 'Document') {
          debugger
          finalFields = this.documentFields.filter(item => item.mappings && item.mappings.length > 0);
          this.prevdocumentFields.forEach(item => {
            if (finalFields.filter(final => final.formFieldName == item.formFieldName).length == 0) {
              item.mappings = [];
              finalFields.push(item);
            }
          });
          this.mapping.mappings = finalFields;
        } else {
          let finalRouteFormFields: DocumentSubModuleMappingField[] = JSON.parse(JSON.stringify(this.routeFormFields.filter(item => item.mappings && item.mappings.length > 0)));
          this.documentFields.forEach(item => {
            if (finalRouteFormFields.find(x => x.formFieldName == item.formFieldName)) {
              let data: DocumentSubModuleMappingField = finalRouteFormFields.find(x => x.formFieldName == item.formFieldName);
              item.mappings = [];
              item.mappings = data.mappings;
            }
          });
          finalFields = this.documentFields.filter(item => item.mappings && item.mappings.length > 0);
          this.prevdocumentFields.forEach(item => {
            if (finalFields.filter(final => final.formFieldName == item.formFieldName).length == 0) {
              item.mappings = [];
              finalFields.push(item);
            }
          });
          this.mapping.mappings = finalFields;
        }
        if (this.action == "Update") {
          this.mapping.objectId = this.selectedObjectId.value;
        }
        debugger
        this.service.AddEditDocumentMapping(this.mapping).subscribe((resp: any) => {
          this.loadSave = false;
          if (resp.message == "success") {

            if (this.action == "Update") {
              if (this.id) {
                this.submitDelivery();
              }
            } else {
              this.toaster.success("Document Mapping has been added successfully.");
              this.router.navigateByUrl("/document-maker-submodule-mapping");
            }

          }
        }, err => {
          this.loadSave = false;
        });
      }
    });
  }

  onChange(event: any, field: any) {

    this.customCompnentValues = this.customCompnentValues.filter(m => m.FieldKey != field.formFieldName);
    event.forEach(item => {
      this.customCompnentValues.push({ FieldKey: field.formFieldName, formFieldId: item.formFieldId, formFieldName: item.formFieldName });
    });
    // this.getCustomeFields();
    // this.documentFields.forEach(docField => {
    //   if (docField == field) {
    //     docField.mappings = event;
    //   }
    // });
  }

  // onClose(event: any, action: any){
  //
  //   this.customCompnentValues = this.customCompnentValues.filter(m=>m.formFieldId != event.value.formFieldId);
  // }

  onTypeSelection(event) {

    this.mapping.type = event.target.value;
    this.clearFields();
    this.mapping.objectId = 0;
    this.selectedObjectId = null;
  }


  onTypeSelectionDoc(event) {

    this.mapping.Doctype = event.target.value;
    this.clearFields();
    this.mapping.objectId = 0;
    this.selectedObjectId = null;
  }


  private clearFields() {
    this.mapping.mappings = [];
    this.documentFields = [];
    this.prevdocumentFields = [];
    this.documentList = [];
  }

  ////////////////////////////////Delivery Options////////////////////////////////////////
  onLoadDeliveryOption() {

    // this.DeliveryOptions = new DocumentDeliveryOptions();
    this.GetSMTPSetting();

    // this.FillEditorDataDelivery(0,this.id);
    this.getCustomeFields();
  }

  submitDelivery() { //Submit 2
    this.loadSave = true;
    // this.DeliveryOptions.id = 2;
    this.DeliveryOptions.documentMakerMappingId = this.id;
    this.DeliveryOptions.statusId = '1001';
    // if(this.DeliveryOptions.body==null
    //   || this.DeliveryOptions.body==undefined || this.DeliveryOptions.body == "")
    //   {
    //     if(this.DeliveryOptions.body == undefined)
    //     {
    //       this.DeliveryOptions.body = null;
    //     }
    //     else{
    //       this.DeliveryOptions.body = this.body;
    //     }
    //   }
    if (this.DeliveryOptions.body == null
      || this.DeliveryOptions.body == undefined || this.DeliveryOptions.body == "") {
      this.DeliveryOptions.body = this.body;

      // this.DeliveryOptions.body = null;
    } else {
      //to be discussed
    }
    this.service.createUpdateMappingDelivery(this.DeliveryOptions).subscribe((resp: any) => {
      this.loadSave = false;
      if (resp.statusCode == "200") {

        this.toaster.success("Document Mapping has been updated successfully.");
        this.router.navigateByUrl("/document-maker-submodule-mapping");
      }
      else {
        this.toaster.error(resp.responseMessage);
      }
    }, err => {
      this.loadSave = false;
    });

  }
  GetSMTPSetting() {
    this.loadSave = true;
    this.companysetupserviceService.getcompanySetupDetail().subscribe((result: any) => {
      this.loadSave = false;
      if (result) {

        this.DeliveryOptions.fromToEmail = result.fromEmail;
      }
    },
      (error: any) => {
        this.loadSave = false;
      })
  }
  FillEditorDataDelivery(id: any, DocumentMakerMappingId: any) {
    //  this.DeliveryOptions = new DocumentDeliveryOptions();
    this.service.GetSubModuleMappingDeliveryById(id, DocumentMakerMappingId).subscribe((result: any) => {
      this.DeliveryOptions = result;
      this.body = result.body;
    });
    //   if (this.customCompnentValues) {
    //   this.customCompnentValues.forEach(element => {
    //     if(element.FieldKey=='Signer1')
    //     {
    //       this.DeliveryOptions.signer1Email = '@' + element.formFieldName;
    //       this.DeliveryOptions.signer1Option =  element.formFieldId;
    //     }
    //     if(element.FieldKey=='Signer2')
    //     {
    //       this.DeliveryOptions.signer2Email = '@' + element.formFieldName;
    //       this.DeliveryOptions.signer2Option =  element.formFieldId;
    //     }
    //   });
    // }
  }




  getCustomeFields() {
    this.customCompnentValues.forEach(element => {

      if (element.FieldKey == 'Signer1') {
        this.DeliveryOptions.signer1Email = '@' + element.formFieldName;
        this.DeliveryOptions.signer1Option = element.formFieldId;
        this.signer1 = true;
      }
      if (element.FieldKey == 'Signer2') {
        this.DeliveryOptions.signer2Email = '@' + element.formFieldName;
        this.DeliveryOptions.signer2Option = element.formFieldId;
        this.signer2 = true;
      }
    });

    if (this.signer1 || this.signer2) {
      this.togglEmail = false;

      this.DeliveryOptions.sendingType = false;
      this.DeliveryOptions.sendingTypeSignNow = true;
    }
    else {
      this.togglEmail = true;

      this.DeliveryOptions.sendingType = true;
      this.DeliveryOptions.sendingTypeSignNow = false;
    }
    if (this.customCompnentValues.length == 0) {
      this.togglEmail = true;
      this.signer2 = false;
      this.signer1 = false;

      this.DeliveryOptions.sendingType = true;
      this.DeliveryOptions.sendingTypeSignNow = false;
    }


    // this.mapping.moduleId = event.module_id;
    //   this.mapping.subModuleIdDb = event.sub_module_id;
    // this.service.GetDocumentMappingFieldsbyid(this.id).subscribe((result: any) => {
    //   if (result) {
    //
    //     // this.customCompnentValues =result ;
    //     this.customCompnentValues.forEach(element => {
    //       if(element.FieldKey=='Signer1')
    //       {
    //         this.DeliveryOptions.signer1Email = '@' + element.formFieldName;
    //         this.DeliveryOptions.signer1Option =  element.formFieldId;
    //         this.signer1 =true;
    //       }
    //       if(element.FieldKey=='Signer2')
    //       {
    //         this.DeliveryOptions.signer2Email = '@' + element.formFieldName;
    //         this.DeliveryOptions.signer2Option =  element.formFieldId;
    //         this.signer2 =true;
    //       }
    //     });

    //     if(this.signer1 && this.signer2)
    //     {
    //       this.togglEmail=false;

    //       this.DeliveryOptions.sendingType =false;
    //       this.DeliveryOptions.sendingTypeSignNow =true;
    //     }
    //     else{
    //        this.togglEmail=true;

    //       this.DeliveryOptions.sendingType =true;
    //       this.DeliveryOptions.sendingTypeSignNow =false;
    //     }

    //   }
    // });
  }

  FillEditorData(displayName, name, formFieldId) {

    if (this.fieldType == "myckeditor") {
      this.ckeditor.instance.insertText('@' + name);
    }
    else if (this.fieldType == "sendToEmail") {
      this.DeliveryOptions.sendToEmail = '@' + name;
      this.DeliveryOptions.sendToOption = formFieldId;
    }
    else if (this.fieldType == "FromEmail") {
      // this.DeliveryOptions.fromToEmail = '@' + name;
      // this.DeliveryOptions.fromToOption = formFieldId;
    }
    else if (this.fieldType == "CCEmail") {
      this.DeliveryOptions.ccEmail = '@' + name;
      this.DeliveryOptions.ccEmailOption = formFieldId;
    }
  }
  onChangesendToEmail($event: any): void {
    this.DeliveryOptions.sendToOption = null;
  }
  onChangeCCEmail($event: any) {
    this.DeliveryOptions.ccEmailOption = null;
  }

  onChangesendFromEmail($event: any): void {
    this.DeliveryOptions.fromToOption = null;
  }

  onChangeCust($event: any): void {
    this.fieldType = "myckeditor";
  }

  onChangeCusttest(): void {
    this.fieldType = "myckeditor";
  }

  onPaste($event: any): void {
  }

  sendToEmailChange(event) {
    this.fieldType = "sendToEmail";
  }
  sendFromEmailChange(event) {
    this.fieldType = "FromEmail";
  }
  sendCCEmailChange(event) {
    this.fieldType = "CCEmail";
  }
  focusOutFunction(event) {
    this.fieldType = "myckeditor";
  }

  OnRemove($event) {

    const fieldName = '@' + $event.value.formFieldName.trim();

    if (this.DeliveryOptions.sendToEmail && fieldName == this.DeliveryOptions.sendToEmail.trim()) {
      this.DeliveryOptions.sendToEmail = null;
      this.DeliveryOptions.sendToOption = null;
    }
    if (this.DeliveryOptions.signer1Email && fieldName == this.DeliveryOptions.signer1Email.trim()) {
      this.DeliveryOptions.signer1Email = null;
      this.DeliveryOptions.signer1Option = null;
      this.signer1 = false;
    }
    if (this.DeliveryOptions.signer2Email && fieldName == this.DeliveryOptions.signer2Email.trim()) {
      this.DeliveryOptions.signer2Email = null;
      this.DeliveryOptions.signer2Option = null;
      this.signer2 = false;
    }
    if (this.signer1 || this.signer2) {
      this.togglEmail = false;
    }
    else {
      this.togglEmail = true;
    }
    if (this.DeliveryOptions.ccEmail && fieldName == this.DeliveryOptions.ccEmail.trim()) {
      this.DeliveryOptions.ccEmail = null;
      this.DeliveryOptions.ccEmailOption = null;
    }
    if (this.DeliveryOptions.body == null
      || this.DeliveryOptions.body == undefined || this.DeliveryOptions.body == "") {
        if(this.body){
          this.DeliveryOptions.body = this.body;
        }
    }
    if (this.DeliveryOptions.body.includes(fieldName)) {
      this.DeliveryOptions.body = this.DeliveryOptions.body.replace(fieldName, '');
    }
  }
}
