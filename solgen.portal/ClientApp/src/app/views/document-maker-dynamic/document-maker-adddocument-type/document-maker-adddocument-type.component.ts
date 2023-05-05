import { error } from '@angular/compiler/src/util';
import { Component, DebugElement, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DocumentMakerService } from '../services/document-maker.service';
import { ContentService } from '../services/content.service';
import { documentFieldsList, documentMaker } from '../dto/document-creation';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { id } from '@swimlane/ngx-datatable';
import { AddNewFieldRouteData, DocumentMakerRouteRuleService } from '../../document-maker-route-rule/document-maker-route-rule.service';

@Component({
  selector: 'app-document-maker-adddocument-type',
  templateUrl: './document-maker-adddocument-type.component.html',
  styleUrls: ['./document-maker-adddocument-type.component.scss']
})
export class DocumentMakerAdddocumentTypeComponent implements OnInit {
  id: any;
  pageTitle: string;
  addNewFieldRule: any;
  isUpdateDoc: boolean = false;
  SubModuleList: any[];
  siteurl: string = '';
  htmlContentList: any[];
  htmlContentDb: any = '';
  documentMaker: FormGroup;
  fileName: any;
  fileUrl: string;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  data: FormData;
  type: any;
  DocumentId: any = null;
  DocumentIdDecrpt: any = null;
  isValid = true;
  loadSave = false;
  @Output() documentListRefresh = new EventEmitter<void>();
  isEdit: boolean = true;
  numberOfPagesInSelectedPDF: number = 0;
  workStatus: any[] = [
    { value: 1001, text: 'Active' },
    { value: 1002, text: 'In-Active' },
  ];

  // pageSize: [] = [
  //   { value: 7 }
  // ];
  pageSize = [];
  placeHolderList: any[] = [];
  placeHolderListEmbed: any[] = [];
  previewFieldsList: any[] = [];
  previewFieldsListHtml: any[] = [];
  previewFieldsListHtmlPreview: any[] = [];
  previewHtmlTaglist: any[] = [];
  KeyValuePairList: any[] = [];
  placeHolderListTem = [];
  fileTypesGroup: any;
  fileSize: number = 5;
  fileExtension: string = '';

  embedImagesHeader: boolean = false;
  contentHeader: object;
  constructor(private fb: FormBuilder,
    private dialogService: ConfirmationDialogService, private DocumentMakerService: DocumentMakerService, private ContentService: ContentService, private toastrSerivce: ToastrService,
    private router: Router, private route: ActivatedRoute, private commonService: CommonService) {

    this.fileUrl = '';
  }

  ngOnInit() {
    this.loadSave = true;
    this.fileUrl = '';
    this.siteurl = window.location.origin;
    this.documentMaker = this.ContentService.buildDocumentMakerFormGroup();
    // (this.documentMaker.get('EmbedImage') as FormArray).push(
    //   this.fb.group({
    //     id: [null],
    //     ImageUrl: [null, Validators.required],
    //     PreviewImageUrl: [null],
    //     page: [null, Validators.required],
    //     Width: [null, Validators.required],
    //     Height: [null, Validators.required],
    //     Top: [null, Validators.required],
    //     Left: [null, Validators.required],
    //     IsImage: [true]
    //   })
    // );
    this.DocumentId = null;
    this.getSubModuleList();
    this.gethtmlContentListList();
    this.getConfigurationTypeFileExtensions();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      ;
      if (this.id) {
        this.pageTitle = "Edit Document";
        this.showpopupEdit(this.id);
      }
      else {
        this.pageTitle = "Add Document";
        this.showpopup();
      }
    });    
    this.initBreadCrumb();
  } 
   initBreadCrumb() {
    this.contentHeader = {
      headerTitle:  'Documents',
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
            name : 'Documents',
            isLink : true,
            link : '/document-maker-list'
          },
          {
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
  }

  showpopup() {

    this.previewFieldsList = [];
    this.documentMaker = this.ContentService.buildDocumentMakerFormGroup();
    //this.fileInput.nativeElement.disabled =false;
    this.isEdit = false;
    this.fileName = "";
    this.fileUrl = "";
    this.DocumentId = null;
    this.isUpdateDoc = true;
  }

  showpopupEdit(id: any) {
    this.loadSave = true;
    this.documentMaker = this.ContentService.buildDocumentMakerFormGroup();
    ;
    this.isUpdateDoc = true;
    // this.fileInput.nativeElement.disabled = true;
    this.fileName = "";
    this.fileUrl = "";
    this.isEdit = true;
    this.previewFieldsList = [];
    this.pageSize = [];
    this.DocumentId = id;
    this.DocumentMakerService.GetDocumentDetailById(id).subscribe((result: any) => {
      if (result.FileType == "pdf") {
        this.fileName = result.FileName == '' ? 'Choose file' : result.FileName;
        this.fileUrl = result.FileUrl;
        if (result.MappingRouteStatus == 'RouteAvailable' || result.MappingRouteStatus == 'MappingAvailable')
          this.documentMaker.controls['statusId'].disable();
        this.isUpdateDoc = true;
        this.documentMaker.patchValue({
          name: result.Name,
          description: result.Description,
          // subModuleId: result.SubModuleId,
          statusId: result.statusId,
          docMakerUpdate: "docMakerUpdate",
          // documentMakerNew : "docMakerNew"

        });
        ;
        if (result.FieldList != null) {
          let count = 1;
          result.FieldList.forEach((element) => {
            let fields = new documentFieldsList();
            fields.FieldKey = count.toString();
            fields.FieldName = element.FieldKey;
            this.previewFieldsList.push(fields);

            count++;
          });
        }
        if (result.EmbedImage) {
          this.embedImagesHeader = true;
          result.EmbedImage.forEach((s) => {
            (<FormArray>this.documentMaker.get('EmbedImage')).push(
              this.fb.group({
                id: [s.id],
                PlaceHolderId: [s.id],
                ImageUrl: [s.ImageUrl, Validators.required],
                PreviewImageUrl: [null],
                page: [{ value: s.page }, Validators.required],
                Width: [s.Width, Validators.required],
                Height: [s.Height, Validators.required],
                Top: [s.Top, Validators.required],
                Left: [s.Left, Validators.required],
                IsImage: 1,
              })
            );
          });
        }

        this.numberOfPagesInSelectedPDF = result.NumberOfPages;
        ;
        if (this.numberOfPagesInSelectedPDF > 0) {
          for (var _i = 1; _i <= this.numberOfPagesInSelectedPDF; _i++) {
            this.pageSize.push({ value: _i });
          }
        }

      }
      else {
        this.isUpdateDoc = false;
        this.fileName = '';
        this.htmlContentDb = '';
        this.fileUrl = result.FileUrl;
        if (result.MappingRouteStatus == 'RouteAvailable' || result.MappingRouteStatus == 'MappingAvailable')
          this.documentMaker.controls['statusId'].disable();
        this.documentMaker.controls['HtmlContentTemplate'].disable();
        this.isUpdateDoc = false;
        this.DocumentIdDecrpt = result.Id
        this.documentMaker.patchValue({
          name: result.Name,
          description: result.Description,
          statusId: result.statusId,
          HtmlContentTemplate: result.HtmlContentTemplate,
          docMakerUpdate: "docMakerNew",

        });
        ;
        let html = result.HtmlContentTemplate.HtmlContent;
        this.htmlContentDb = result.HtmlContentTemplate.HtmlContent;
        var temp = document.createElement("div");
        temp.innerHTML = html;
        var all = temp.getElementsByTagName("*");
        var tags = [];
        let count = 1
        for (var i = 0, max = all.length; i < max; i++) {

          // Do something with the element here

          if (all[i].getAttribute('data-tag')) {
          
              this.previewHtmlTaglist.push(all[i].getAttribute('data-tag'));
              ;
              let NodeType = '';
              // this.previewHtmlTaglist.forEach((element) => {
              let fields = new documentFieldsList();
              fields.FieldKey = count.toString();
              fields.FieldName = all[i].getAttribute('data-tag');
              if (all[i].tagName.toUpperCase() == 'DIV' || all[i].tagName.toUpperCase() == 'B' || all[i].tagName.toUpperCase() == 'I') {
                NodeType = 'Textbox'
              }
              if (all[i].tagName.toUpperCase() == 'A') {
                NodeType = 'Link'
              }
              if (all[i].tagName.toUpperCase() == 'VIDEO') {
                NodeType = 'Video'
              }
              if (all[i].tagName.toUpperCase() == 'IFRAME') {
                NodeType = 'Map'
              }
              if (all[i].tagName.toUpperCase() == 'IMG') {
                NodeType = 'Image'
              }
              fields.FieldType = NodeType;
              this.previewFieldsList.push(fields);
              count++;
              // });
            
          }
          //this.previewHtmlTaglist.push(all[i].getAttribute('data-tag'),<HTMLAnchorElement>all[i]);
        }

        if (this.previewFieldsList.length > 0) {
          count = this.previewFieldsList.length + 1;
        }
        var found = [],          // an array to collect the strings that are found
          rxp = /{([^}\}]+)}/g,
          curMatch;
        while (curMatch = rxp.exec(temp.innerHTML)) {
          var abnc = "{" + curMatch[1] + "}";
          if (this.previewFieldsList.filter(x => x.FieldName == abnc).length == 0) {
            let fields = new documentFieldsList();
            fields.FieldKey = count.toString();
            fields.FieldName = abnc;
            fields.FieldType = "Partial  Text";
            this.previewFieldsList.push(fields);
            count++
          }
          
          //   found.push('{'+abnc+'}');
        }




        this.previewFieldsListHtml = [];
        if (result.FieldList != null) {
          let count = 1;
          result.FieldList.forEach((element) => {
            let fields = new documentFieldsList();
            fields.FieldKey = count.toString();
            fields.FieldName = element.FieldKey;
            fields.PlaceHolderId = element.placeHolderid
            this.previewFieldsListHtml.push(fields);
            count++;
          });
        }
      }
    }), error=>{
      // console.log(error);
      setTimeout(() => {
       this.loadSave = false;
      }, 500);
    };
  }

  // get subModuleId() {
  //   return this.documentMaker.get('subModuleId');
  // }
  get statusId() {
    return this.documentMaker.get('statusId');
  }



  onHtmlChange(event) {
    this.previewHtmlTaglist = [];
    this.previewFieldsList = [];
    ;
    if (event) {
      let html = event.HtmlContent
      var temp = document.createElement("div");
      temp.innerHTML = html;
      let count = 1;
      var all = temp.getElementsByTagName("*");
      var tags = [];




      for (var i = 0, max = all.length; i < max; i++) {
        // Do something with the element here

        if (all[i].getAttribute('data-tag')) {
         
            this.previewHtmlTaglist.push(all[i].getAttribute('data-tag'));

            let NodeType = '';
            // this.previewHtmlTaglist.forEach((element) => {
            let fields = new documentFieldsList();
            fields.FieldKey = count.toString();
            fields.FieldName = all[i].getAttribute('data-tag');
            if (all[i].tagName.toUpperCase() == 'DIV'|| all[i].tagName.toUpperCase() == 'B' || all[i].tagName.toUpperCase() == 'I') {
              NodeType = 'Textbox'
            }
            if (all[i].tagName.toUpperCase() == 'A') {
              NodeType = 'Link'
            }
            if (all[i].tagName.toUpperCase() == 'VIDEO') {
              NodeType = 'Video'
            }
            if (all[i].tagName.toUpperCase() == 'IFRAME') {
              NodeType = 'Map'
            }
            if (all[i].tagName.toUpperCase() == 'IMG') {
              NodeType = 'Image'
            }



            fields.FieldType = NodeType;
            this.previewFieldsList.push(fields);
            count++;
          }
          // });
       





        //this.previewHtmlTaglist.push(all[i].getAttribute('data-tag'),<HTMLAnchorElement>all[i]);
      }
      if (this.previewFieldsList.length > 0) {
        count = this.previewFieldsList.length + 1;
      }



      var found = [],          // an array to collect the strings that are found
        rxp = /{([^}\}]+)}/g,
        curMatch;
      while (curMatch = rxp.exec(temp.innerHTML)) {
        var abnc = "{" + curMatch[1] + "}";
        if (this.previewFieldsList.filter(x => x.FieldName == abnc).length == 0) {
          let fields = new documentFieldsList();
          fields.FieldKey = count.toString();
          fields.FieldName = abnc;
          fields.FieldType = "Partial  Text";
          this.previewFieldsList.push(fields);
          this.previewHtmlTaglist.push(abnc);
          count++
        }
       
        //   found.push('{'+abnc+'}');
      }


      //let test = this.stringToHTML(html);
      //var el = test.querySelectorAll('div');


      //  var i;
      //  for (i = 0; i < el.length; i++) {
      //  let test  =  el[i].getAttribute('data-tag');
      //  if(test)
      //  this.previewHtmlTaglist.push(test);
      //  }
      //  if (this.previewHtmlTaglist) {
      //    let count = 1;
      //    this.previewHtmlTaglist.forEach((element) => {
      //      let fields = new documentFieldsList();
      //      fields.FieldKey = count.toString();
      //      fields.FieldName = element;
      //      this.previewFieldsList.push(fields);
      //      count++;
      //    });
      //  }
    }
  }


  stringToHTML(str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  };




  ShowHidFields(e) {
    this.previewHtmlTaglist = [];
    this.previewFieldsList = [];
    var val = e.target.value;
    if (val === 'docMakerNew') {
      this.isUpdateDoc = false;
      this.documentMaker.get('HtmlContentTemplate').setValidators([Validators.required]);
      this.documentMaker.get('HtmlContentTemplate').updateValueAndValidity();
      this.fileName = '';

    }
    else if (val === 'docMakerUpdate') {
      this.isUpdateDoc = true;
      this.documentMaker.get('HtmlContentTemplate').clearValidators();
      this.documentMaker.get('HtmlContentTemplate').updateValueAndValidity();
      this.documentMaker.get('HtmlContentTemplate').setValue(null);
    }

  }

  getSubModuleList() {

    this.DocumentMakerService.getSubModulesList().subscribe(response => {
      this.SubModuleList = response;
    })
  }

  gethtmlContentListList() {

    this.DocumentMakerService.getHtmlContentList().subscribe(response => {
      this.htmlContentList = response;
    })
  }


  save() {
    ;
    this.loadSave = true;
    const documentId = this.DocumentId == null ? 0 : this.DocumentId;
    const documentName = this.documentMaker.get('name').value;
    this.DocumentMakerService.VerifyDuplicateName(documentName, documentId).subscribe(result => {
      if (result == 1) {
        this.toastrSerivce.error("Document is already exist with same name. Please enter another name.");
        this.loadSave = false;
      }
      else {
        this.placeHolderListTem = [];
        this.placeHolderListEmbed = [];
        let payload = JSON.stringify(this.createPayload());
        // if(this.DocumentId!=null)
        // {

        //   this.DocumentMakerService.deleteDocumentMaker(this.DocumentId).subscribe(
        //     (result) => {

        //     },
        //     (error) => {},
        //     () => {
        //       this.loadSave = false;
        //     }
        //   );

        // }
        if (this.isUpdateDoc) {

          this.DocumentMakerService.createUpdateDocument(payload).subscribe(response => {

            if (response.statusCode == 200) {

              //  let id = encodeURIComponent(response.id);
              // if(this.isUpdateDoc){
              if (this.DocumentId == null) {
                this.AddEditFiles(response.id);
                //   this.loadSave = false;
                // this.toastrSerivce.success("Document uploading successfully");
                // this.documentListRefresh.emit();
                this.fileInput.nativeElement.value = '';

              }
              else {
                // this.placeHolderListTem = this.documentMaker.get('EmbedImage').value;
                // for (let i = 0; i < this.placeHolderListTem.length; i++) {
                //   let documentFields = new documentFieldsList();
                //   documentFields.DocumentId = response.id;
                //   documentFields.FieldKey = this.placeHolderListTem[i].ImageUrl;
                //   documentFields.FieldName = this.placeHolderListTem[i].ImageUrl;
                //   documentFields.PageNumber = this.placeHolderListTem[i].page && this.placeHolderListTem[i].page.value ? this.placeHolderListTem[i].page.value : null;
                //   documentFields.IsImage = 1;
                //   documentFields.Width = this.placeHolderListTem[i].Width;
                //   documentFields.height = this.placeHolderListTem[i].Height;
                //   documentFields.top = this.placeHolderListTem[i].Top;
                //   documentFields.left = this.placeHolderListTem[i].Left;
                //   this.placeHolderListEmbed.push(documentFields);

                //  }
                if (this.documentMaker.valid) {
                  this.GetEmbdedFields(response.id);
                  if (this.placeHolderListEmbed.length == 0) {
                    let documentFields = new documentFieldsList();
                    documentFields.DocumentId = response.id;
                    documentFields.FieldKey = '';
                    documentFields.FieldName = '';
                    documentFields.PageNumber = null;
                    documentFields.IsImage = 1;
                    documentFields.Width = null;
                    documentFields.height = null;
                    documentFields.top = null;
                    documentFields.left = null;
                    documentFields.PlaceHolderId = null;
                    this.placeHolderListEmbed.push(documentFields);
                  }

                  this.DocumentMakerService.savePlaceHolder(this.placeHolderListEmbed).subscribe(result => {
                    if (result.statusCode == 200) {
                      this.loadSave = false;
                      // this.toastrSerivce.success("Document uploading successfully");
                      // this.documentListRefresh.emit();
                      this.router.navigateByUrl("/document-maker-list");


                    }
                    else {
                      this.loadSave = false;
                    }

                  });
                  this.loadSave = false;
                  this.toastrSerivce.success("Document has been updated successfully.");
                  // this.documentListRefresh.emit();
                  this.router.navigateByUrl("/document-maker-list");
                  this.fileInput.nativeElement.value = '';

                }
                else {
                  this.commonService.validateAllFormFields(this.documentMaker);
                }

              }
              // }
              // else if(!this.isUpdateDoc){

              // }
              // this.adddocumentmaker.hide();
              // this.router.navigateByUrl("/document-maker-list/add/" + id);
              // this.toastrSerivce.success(response.responseMessage);

            }
            else {
              ;
              this.toastrSerivce.error(response.responseMessage);
            }
          });
        }
        else {
          if (this.previewFieldsList) {
            this.DocumentMakerService.createUpdateDocument(payload).subscribe(response => {

              if (response.statusCode == 200) {
                if (this.DocumentId == null) {
                  this.getDocumentFieldsForHtml(response.id);
                }
                else {
                  ;


                  if (this.documentMaker.valid) {
                    if (this.previewFieldsListHtml) {
                      this.getDocumentFieldsForHtmlForEdit(response.id);
                    }
                    //   this.loadSave = false;
                    //   this.toastrSerivce.success("Document has been updated successfully.");

                    // this.router.navigateByUrl("/document-maker-list");
                    // this.fileInput.nativeElement.value = '';

                  }
                  else {
                    this.commonService.validateAllFormFields(this.documentMaker);
                  }

                }
              }
              else {
                ;
                this.toastrSerivce.error(response.responseMessage);
              }
            });
          }
          else {
            this.toastrSerivce.error("No fields available in this html template");
          }
        }
      }
    });


  }


  getDocumentFieldsForHtml(documentId: any) {
    ;
    this.loadSave = true;
    this.placeHolderListTem = [];
    if (this.previewHtmlTaglist) {
      let count = 1;
      this.previewHtmlTaglist.forEach((element) => {
        let fields = new documentFieldsList();
        fields.DocumentId = documentId;
        fields.FieldKey = element;
        fields.FieldName = element;
        fields.IsImage = 0;
        this.placeHolderListTem.push(fields);
        count++;
      });
    }
    this.DocumentMakerService.savePlaceHolder(this.placeHolderListTem).subscribe(result => {
      if (result.statusCode == 200) {
        this.loadSave = false;
        this.toastrSerivce.success("Document has been added successfully.");
        // this.documentListRefresh.emit();
        this.router.navigateByUrl("/document-maker-list");

      }
      else {
        this.loadSave = false;
      }
    });
  }



  getDocumentFieldsForHtmlForEdit(documentId: any) {
    ;
    ;
    this.loadSave = true;
    this.placeHolderListTem = [];
    // let exist  = this.previewFieldsList.filter(x=> !this.previewFieldsListHtml.find(y=>y.FieldName == x.FieldName) )
    // if(exist)
    // {

    // }

    // for (var j = 0; j < this.previewFieldsListHtml.length; j++) {

    // if(this.previewFieldsListHtml[j].FieldName == )   
    // {

    // }     

    // }



    for (var i = 0; i < this.previewFieldsList.filter(x => !this.previewFieldsListHtml.find(y => y.FieldName == x.FieldName)).length; i++) {// added to remove already added 
      let fields = new documentFieldsList();
      fields.DocumentId = documentId;
      fields.FieldKey = this.previewFieldsList.filter(x => !this.previewFieldsListHtml.find(y => y.FieldName == x.FieldName))[i].FieldName;
      fields.FieldName = this.previewFieldsList.filter(x => !this.previewFieldsListHtml.find(y => y.FieldName == x.FieldName))[i].FieldName;
      fields.IsImage = 0;
      this.placeHolderListTem.push(fields);



      // let test = this.previewFieldsList.filter(x=> !this.previewFieldsListHtml.find(y=>y.FieldName == x.FieldName))[i].FieldName;
      //   for (var j = 0; j < this.previewFieldsListHtml.length; j++) {


      //     if (this.previewFieldsList[i].FieldName == this.previewFieldsListHtml[j].FieldName) {
      //       // let fields = new documentFieldsList();
      //       // fields.DocumentId = documentId;
      //       // fields.FieldKey = this.previewFieldsList[i].FieldName;
      //       // fields.FieldName = this.previewFieldsList[i].FieldName;
      //       // fields.IsImage = 0;
      //       // fields.PlaceHolderId = this.previewFieldsList[i].PlaceHolderId >0 ? this.previewFieldsList[i].PlaceHolderId : 0 ;
      //       // this.placeHolderListTem.push(fields);
      //     }
      //   }
    }




    this.DocumentMakerService.savePlaceHolder(this.placeHolderListTem).subscribe(result => {
      if (result.statusCode == 200) {
        this.loadSave = false;
        this.toastrSerivce.success("Document has been added successfully.");
        // this.documentListRefresh.emit();
        this.router.navigateByUrl("/document-maker-list");

      }
      else {
        this.toastrSerivce.success("Document has been added successfully.");
        // this.documentListRefresh.emit();
        this.router.navigateByUrl("/document-maker-list");
        this.loadSave = false;
      }
    });
  }




  GetEmbdedFields(DocumentId: any) {
    this.placeHolderListTem = [];
    this.placeHolderListEmbed = [];
    ;
    this.placeHolderListTem = this.documentMaker.get('EmbedImage').value;
    for (let i = 0; i < this.placeHolderListTem.length; i++) {
      let documentFields = new documentFieldsList();
      documentFields.DocumentId = DocumentId;
      documentFields.FieldKey = this.placeHolderListTem[i].ImageUrl;
      documentFields.FieldName = this.placeHolderListTem[i].ImageUrl;
      documentFields.PlaceHolderId = this.placeHolderListTem[i].id;
      documentFields.FieldValue = this.placeHolderListTem[i].PreviewImageUrl;
      documentFields.PageNumber = this.placeHolderListTem[i].page && this.placeHolderListTem[i].page.value ? this.placeHolderListTem[i].page.value : null;
      documentFields.IsImage = 1;
      documentFields.Width = this.placeHolderListTem[i].Width;
      documentFields.height = this.placeHolderListTem[i].Height;
      documentFields.top = this.placeHolderListTem[i].Top;
      documentFields.left = this.placeHolderListTem[i].Left;
      this.placeHolderListEmbed.push(documentFields);
    }
  }
  createPayload() {
    ;
    let documentMakerObj = new documentMaker();
    const workstatus = this.documentMaker.get('statusId').value;
    documentMakerObj.id = this.DocumentId;
    documentMakerObj.name = this.documentMaker.get('name').value;
    documentMakerObj.HtmlContentTemplate = !this.isUpdateDoc ? this.documentMaker.get('HtmlContentTemplate').value.Id : 0;
    documentMakerObj.description = this.documentMaker.get('description').value;
    documentMakerObj.statusId = workstatus.value;
    documentMakerObj.json = '';
    documentMakerObj.url = '';
    documentMakerObj.fileTypeExtension = this.isUpdateDoc ? 'pdf' : 'html';
    documentMakerObj.numberOfPages = this.numberOfPagesInSelectedPDF;
    // documentMakerObj.embdedImage = this.documentMaker.get('EmbedImage').value;
    return documentMakerObj;
  }

  get EmbedImages() {
    return (this.documentMaker.get('EmbedImage') as FormArray).controls;
  }

  onAddPdfContols() {
    ;
    this.embedImagesHeader = true;
    (this.documentMaker.get('EmbedImage') as FormArray).push(
      this.fb.group({
        id: [null],
        page: [null],
        ImageUrl: [null],
        PreviewImageUrl: [null],
        Width: [null],
        Height: [null],
        Top: [null],
        Left: [null],
        IsImage: [true]
      })
    );
  }
  onNameValueChange(event, control, i) {
    ;
    if (event) {
      if (control.get("ImageUrl").value && control.get("ImageUrl").value != "") {
        control.get('Width').setValidators([Validators.required]);
        control.get('Width').updateValueAndValidity();
        control.get('Height').setValidators([Validators.required]);
        control.get('Height').updateValueAndValidity();
        control.get('Top').setValidators([Validators.required]);
        control.get('Top').updateValueAndValidity();
        control.get('Left').setValidators([Validators.required]);
        control.get('Left').updateValueAndValidity();
        control.get('page').setValidators([Validators.required]);
        control.get('page').updateValueAndValidity();
      } else {
        control.get('Width').clearValidators();
        control.get('Width').updateValueAndValidity();
        control.get('Height').clearValidators();
        control.get('Height').updateValueAndValidity();
        control.get('Top').clearValidators();
        control.get('Top').updateValueAndValidity();
        control.get('Left').clearValidators();
        control.get('Left').updateValueAndValidity();
        control.get('page').clearValidators();
        control.get('page').updateValueAndValidity();

      }
    }





    // conditionsId
    // if (event) {

    //   control.get('conditionsId').clearValidators();
    //   control.get('conditionsId').updateValueAndValidity();

    //   control.get('fieldValue').clearValidators();
    //   control.get('fieldValue').updateValueAndValidity();
    //   control.get('disableDropdown').setValue(true);
    // }
    // else {
    //   control.get('disableDropdown').setValue(false);
    //   control.get('conditionsId').setValidators([Validators.required]);
    //   control.get('fieldValue').setValidators([Validators.required]);
    // }
    // if (typeof event !== 'undefined') {
    //   this.SelectedValue.push(event);
    //   control.get('conditionsId').setValue(null);

    //   if (typeof event !== 'undefined') {
    //     control.conditionOperatorsValue = null;
    //     this.sortConditionOperatoers(control, control.value.fieldId.dt_code);
    //   }
    // } else {
    //   control.get('conditionsId').setValue(null);
    //   control.get('conditions').setValue([]);
    // }
  }
  onPageWidthHeightValueChange(event, control, i) {
    ;
    // if(event){
    if ((control.get("Width").value && control.get("Width").value != "") ||
      (control.get("Height").value && control.get("Height").value != "") ||
      (control.get("Top").value && control.get("Top").value != "") ||
      (control.get("Left").value && control.get("Left").value != "") ||
      (control.get("page").value && control.get("page").value != "")) {
      control.get('ImageUrl').setValidators([Validators.required]);
      control.get('ImageUrl').updateValueAndValidity();
    } else {
      control.get('ImageUrl').clearValidators();
      control.get('ImageUrl').updateValueAndValidity();
    }
    // }
    // else{
    //   control.get('ImageUrl').clearValidators();
    //   control.get('ImageUrl').updateValueAndValidity();
    //  }
  }
  onDeletePdfContols(id, index) {
    if (id) {
      const message = `Are you sure you want to delete this embed image?`;
      this.dialogService.confirm('DELETE EMBED IMAGE', message).subscribe((confirmed) => {
        if (confirmed) {
          this.loadSave = true;
          var array = this.documentMaker.get('EmbedImage') as FormArray;
          ;
          array.removeAt(index);
          this.loadSave = false;
        }
      });
    } else {
      var array = this.documentMaker.get('EmbedImage') as FormArray;
      array.removeAt(index);
    }
  }


  // removeFields(index: any) {
  //   const message = `Are you sure you want to delete this row?`;
  //   this.dialogService.confirm('Delete Row', message).subscribe(confirmed => {
  //     if (confirmed) {

  //       this.fields.removeAt(index);
  //       if (this.fields.length == index) {
  //         (this.fields.controls[index - 1] as FormGroup).patchValue(
  //           {
  //             type: ''
  //           });
  //       }
  //       this.filtersearch();
  //       let dateControl = this.fieldmodel.filter(x => x.operatorId == 8 && x.fieldText == "date");
  //       this.showDateFilterTop = true;
  //       if (dateControl != null && typeof dateControl != 'undefined' && dateControl.length > 0) {
  //         this.showDateFilterTop = false;
  //       }
  //     }
  //   });
  // }


  setFile($event): void {
    this.commonService.validUploadDocumentType($event.target.files[0].name, '.pdf');
    this.commonService.validUploadDocumentSize($event.target.files[0].size, 20);
    if (this.commonService.isFileValid && this.commonService.isFileExtensionValid) {
      this.fileName = $event.target.files[0].name;
      this.type = $event.target.files[0].type;
      this.isEdit = false;
      this.loadSave = true;

      this.fileName = $event.target.files[0].name;
      this.fileName = this.fileName.split(' ').join('_');
      this.type = $event.target.files[0].type;
      if (this.fileName != null && this.fileName != 'Select') {
        this.isValid = true;
      }

      const input = new FormData();
      const fileBrowser = this.fileInput.nativeElement;

      if (fileBrowser.files && fileBrowser.files[0]) {
        input.append('file', fileBrowser.files[0]);
      }
      ;

      this.DocumentMakerService.previewFields(input).subscribe(result => {
        this.previewFieldsList = [];
        let count = 1;
        result.forEach((element: string) => {
          if (count != result.length) {
            let fields = new documentFieldsList();
            fields.FieldKey = count.toString();
            fields.FieldName = element;
            fields.FieldValue = "";
            this.previewFieldsList.push(fields);
            count++;
          }
        });

        this.numberOfPagesInSelectedPDF = parseInt(result[result.length - 1]);
        this.loadSave = false;

      }, error => {
        this.loadSave = false;
        this.toastrSerivce.error(error.error);
      }
      );
    }
  }

  AddEditFiles(id: any) {
    if (this.fileName === null || this.fileName === ''
      || typeof this.fileName === 'undefined'
      || this.fileName == 'Select') {
      this.isValid = false;
    }

    else {
      this.isValid = true;
    }
    if (this.isValid && this.documentMaker.valid) {
      this.loadSave = true;

      const filesModel = this.prepareFormDataForFiles(id);
      this.commonService.addOrUpdateFiles(filesModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          // this.toastrSerivce.success(result.responseMessage);
          this.getDocumentFields(id);

          // window.location.href = "/document-maker-list";
          // this.router.navigateByUrl("/document-maker-list");
        }
        else {

          setTimeout(() => {
            this.loadSave = false;
          }, 500);
          this.toastrSerivce.error(result.responseMessage);
        }
      }, error => {
        setTimeout(() => {
          this.loadSave = false;
        }, 500);
      });
    }
  }

  private prepareFormDataForFiles(id: any) {
    const input = new FormData();
    input.append('Id', id);
    if (this.commonService.isUploadImageValid) {
      if (this.fileName !== null) {
        input.append('filename', this.fileName);
        input.append("moduleName", "managedocument");
        input.append("SubmoduleName", "documentmaker");
        input.append("isDocumentModule", "true");
        input.append("type", "pdf");
        input.append("filetype", null)
        input.append("documentTitle", this.documentMaker.value.name)
        input.append("categoryId", null)
        input.append("description", this.documentMaker.value.description)
      }
    }

    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      input.append('file', fileBrowser.files[0]);
    }

    return input;
  }

  getDocumentFields(documentId: any) {
    ;
    this.loadSave = true;
    this.placeHolderListTem = [];
    this.DocumentMakerService.getDocumentFields(documentId).subscribe(response => {
      response.forEach(element => {
        let documentFields = new documentFieldsList();
        documentFields.DocumentId = documentId;
        documentFields.FieldKey = element;
        documentFields.FieldName = element;
        documentFields.IsImage = 0;
        this.placeHolderList.push(documentFields);
      });
      this.DocumentMakerService.savePlaceHolder(this.placeHolderList).subscribe(result => {
        if (result.statusCode == 200) {
          this.loadSave = false;
          this.toastrSerivce.success("Document has been added successfully.");
          // this.documentListRefresh.emit();
          this.router.navigateByUrl("/document-maker-list");

        }
        else {
          this.loadSave = false;
        }
      });
    });
  }
  replaceAll(str, find, replace) {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }
  PreviewFields() {
    if (this.isUpdateDoc) {

      this.GetEmbdedFields(this.DocumentId);
      this.loadSave = true;
      let KeyValues = JSON.parse(JSON.stringify(this.previewFieldsList));
      KeyValues.push(...this.placeHolderListEmbed)
      this.fileUrl;
      let list = {
        url: this.fileUrl,
        keyValueList: KeyValues
      };
      this.DocumentMakerService.previewDocument(list).subscribe(result => {
        var response = this.commonService.base64ToArrayBuffer(result);
        let file = new Blob([response], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        this.loadSave = false;
        window.open(fileURL);
      });
    }
    else {
      this.previewFieldsListHtmlPreview = [];
      let KeyValuesHtml = JSON.parse(JSON.stringify(this.previewFieldsList));
      let html = this.htmlContentDb;
      var temp = document.createElement("div");
      temp.innerHTML = html;

      var all = temp.getElementsByTagName("*");

      


      var tags = [];
      for (var i = 0, max = all.length; i < max; i++) {
        if (KeyValuesHtml) {
          KeyValuesHtml.forEach(element => {
            var found = [],          // an array to collect the strings that are found
              rxp = /{([^}\}]+)}/g,
              curMatch;
              if(all[i])
              {
            while (curMatch = rxp.exec(all[i].innerHTML)) {
              if (curMatch) {
                let currentMatch = "{" + curMatch[1] + "}";
                if (currentMatch == element.FieldName) {

                  if (element.FieldValue) {
                    var res = all[i].innerHTML.replace(currentMatch, element.FieldValue) //inner.replace(/blue/gi, "red");
                    all[i].innerHTML = res;
                  }
                }
              }
            }


            // Do something with the element here
            if (all[i].getAttribute('data-tag')) {
              let NodeType = '';

              // this.previewHtmlTaglist.forEach((element) => {
              let data_tag_Name = all[i].getAttribute('data-tag');
              if (all[i].tagName.toUpperCase() == 'DIV' || all[i].tagName.toUpperCase() == 'B' || all[i].tagName.toUpperCase() == 'I') {
                if (data_tag_Name == element.FieldName) {
                  if (element.FieldValue)
                    (<HTMLElement>all[i]).innerText = element.FieldValue;
                }
              }
              if (all[i].tagName.toUpperCase() == 'A') {

                if (data_tag_Name == element.FieldName) {
                  if (element.FieldValue)
                    all[i].setAttribute('src', element.FieldValue);
                }
              }
              if (all[i].tagName.toUpperCase() == 'VIDEO') {
                if (data_tag_Name == element.FieldName) {
                  if (element.FieldValue)
                    all[i].setAttribute('src', element.FieldValue);
                }
              }
              if (all[i].tagName.toUpperCase() == 'IFRAME') {
                if (data_tag_Name == element.FieldName) {
                  if (element.FieldValue)
                    all[i].setAttribute('src', element.FieldValue);
                }
              }
              if (all[i].tagName.toUpperCase() == 'IMG') {
                if (data_tag_Name == element.FieldName) {
                  if (element.FieldValue)
                    all[i].setAttribute('src', element.FieldValue);
                }
              }

              // });
            }
 }
          });

        }

      }
      localStorage.setItem('htmlMaker', temp.innerHTML);
      let Url = this.siteurl + "/proposal-document/" + this.id + "/Document";
      window.open(Url);
      this.loadSave = false;

    }

  }
  getConfigurationTypeFileExtensions() {
    this.commonService.getConfigurationTypeFileExtensions('Documents').subscribe((result: any) => {
      if (result && result.FileTypesGroup != '') {
        this.fileSize = result.FileSize;
        this.fileTypesGroup = JSON.parse(result.FileTypesGroup);
        this.fileTypesGroup.forEach(obj => {
          if (obj.FileTypes) {
            let extension = obj.FileTypes.map(x => x.Name);
            this.fileExtension += extension.join(", ");
          }
        });
      }
      this.loadSave = false;
    }), error=> {
      // console.log(error)
      setTimeout(() => {
        this.loadSave = false;
      }, 500);
    };
  }
}
