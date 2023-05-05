import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { column, document, placeHolder} from '../dto/document-creation';
import { ContentService } from '../services/content.service';

import { angularEditorConfig, AngularEditorConfig } from '../../shared/thirdParty/lib/config';
import { saveAs } from 'file-saver';
import { documentConst } from '../../shared/constants/document-const';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentMakerService } from '../services/document-maker.service';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit, OnDestroy {
  htmlContent1 = '';
  toolBarSubscrption: any;
  constructor(private fb: FormBuilder, private contentService: ContentService, private documentService: DocumentMakerService,
    private route: ActivatedRoute) {}

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    outline: true,
    defaultFontName: 'Comic Sans MS',
    defaultFontSize: '5',
    showToolbar: false,
    defaultParagraphSeparator: 'p',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  documentForm: FormGroup;
  placeHolder: placeHolder[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.getDocumentById(id);
        }
      }
    );
    this.buildForm(this.contentService.initializeDoc());
    this.toolBarSubscrption = this.contentService.getToolBarProperty().subscribe((control) => {
      this.config.showToolbar = control;
    });
    this.contentService.getFocusRichTextEvent().subscribe((configObj) => {
      if (configObj) {
        this.config = configObj;
        this.focusIn();
      }
    });
  }

  private buildForm(doc: document) {
    this.documentForm = this.contentService.buildDocumentFormGroup(doc);
  }

  getFonts() {
    const fonts = this.config.fonts ? this.config.fonts : angularEditorConfig.fonts;
    return fonts.map((x) => {
      return { label: x.name, value: x.name };
    });
  }
  ngOnDestroy(): void {
    this.toolBarSubscrption.unsubscribe();
  }

  // executeCommand(command: string) {
  //   this.focus();
  //   if (command === 'toggleEditorMode') {
  //     this.toggleEditorMode(this.modeVisual);
  //   } else if (command !== '') {
  //     if (command === 'clear') {
  //       this.editorService.removeSelectedElements(this.getCustomTags());
  //       this.onContentChange(this.textArea.nativeElement);
  //     } else if (command === 'default') {
  //       this.editorService.removeSelectedElements('h1,h2,h3,h4,h5,h6,p,pre');
  //       this.onContentChange(this.textArea.nativeElement);
  //     } else {
  //       this.editorService.executeCommand(command);
  //     }
  //     this.exec();
  //   }
  // }

  focusIn() {
    this.contentService.setToolBarProperty(true);
  }
  focusOut(event) {
    const textArea = event.path.filter(function(param){
      return param.classList && param.classList.contains('angular-editor-textarea');
    });
    if (textArea.length < 1) {
      this.contentService.setToolBarProperty(false);
    }
  }

  submitDocument() {
    var response = this.documentForm.value;
    response.rows.forEach(element=>{
      let obj = new placeHolder();
      element.columns.forEach(item=>{
        obj.type = item.type;
        obj.fieldKey = item.fieldKey;
        obj.fieldName = item.fieldName;
        obj.defaultValue = item.defaultValue;
        obj.dropdownList = item.dropdownList;
      });
      if(obj.type === documentConst.FIELDINPUT || obj.type === documentConst.SIGNATURE || obj.type === documentConst.INITIALS || obj.type === documentConst.DATE ||
        obj.type === documentConst.CHECKBOX || obj.type === documentConst.DROPDOWN || obj.type === documentConst.CARD || obj.type === documentConst.FILE){
          this.placeHolder.push(obj);
        }
    });
    response.placeHolder = this.placeHolder;
    const blob = new Blob([JSON.stringify(response)], {type : 'application/json'});
    saveAs(blob, 'sample.json');
    // this.dataService.document = this.documentForm;
    // this.toastrService.success(
    //   "Document submitted successfully, Preview is available now."
    // );
    // this.submitted = true;
  }

  getDocumentById(documentId){
    this.documentService.getDocumentById(documentId).subscribe(response=>{
      let a = response;
    })

  }
}
