import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { componentBase, document, page } from "../dto/document-creation";
import { ContentService } from "../services/content.service";

import {
  angularEditorConfig,
  AngularEditorConfig,
} from "../../shared/thirdParty/lib/config";
import { DataService } from "../services/data.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-document",
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.scss"],
})
export class DocumentComponent implements OnInit, OnDestroy {
  htmlContent1 = "";
  toolBarSubscrption: any;
  submitted: boolean = false;
  componentsLength: number;
  pageAddSubscription;
  constructor(
    private fb: FormBuilder,
    private documnetService: ContentService,
    private contentService: ContentService,
    public dataService: DataService,
    private toastrService: ToastrService
  ) {}

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: "5rem",
    maxHeight: "15rem",
    placeholder: "Enter text here...",
    translate: "no",
    sanitize: false,
    toolbarPosition: "top",
    outline: true,
    defaultFontName: "Comic Sans MS",
    defaultFontSize: "5",
    showToolbar: false,
    defaultParagraphSeparator: "p",
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
  };

  documentForm: FormGroup;

  ngOnInit(): void {
    this.pageAddSubscription = this.contentService.onPageAdd.subscribe((x) =>
      (this.documentForm.get("pages") as FormArray).push(
        this.contentService.buildPageFormGroup()
      )
    );
    if (this.dataService.document) {
      this.documentForm = this.dataService.document;
    } else {
      this.buildForm(this.documnetService.initializeDoc());
    }
    this.toolBarSubscrption = this.contentService
      .getToolBarProperty()
      .subscribe((control) => {
        this.config.showToolbar = control;
      });
    this.documnetService.getFocusRichTextEvent().subscribe((configObj) => {
      if (configObj) {
        this.config = configObj;
        this.focusIn();
      }
    });
  }

  private buildForm(doc: document) {
    this.documentForm = this.documnetService.buildDocumentFormGroup(doc);
  }

  getFonts() {
    const fonts = this.config.fonts
      ? this.config.fonts
      : angularEditorConfig.fonts;
    return fonts.map((x) => {
      return { label: x.name, value: x.name };
    });
  }
  ngOnDestroy(): void {
    this.toolBarSubscrption.unsubscribe();
    this.pageAddSubscription.unsubscribe();
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
    const textArea = event.path.filter(function (param) {
      return (
        param.classList && param.classList.contains("angular-editor-textarea")
      );
    });
    if (textArea.length < 1) {
      this.contentService.setToolBarProperty(false);
    }
  }

  submitDocument() {
    this.dataService.document = this.documentForm;
    this.toastrService.success(
      "Document submitted successfully, Preview is available now."
    );
    this.submitted = true;
    // // console.log("from group value JSON:", JSON.stringify(this.documentForm.value));
  }
}
