import { DOCUMENT } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  SecurityContext,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  Renderer2,
  Inject,
  ViewEncapsulation,
  AfterViewInit,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ContentService } from "src/app/views/document-maker/services/content.service";
import { AngularEditorService } from "../../thirdParty/lib/angular-editor.service";
import { AngularEditorConfig } from "../../thirdParty/lib/config";
@Component({
  selector: "app-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TextComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input("textBox") public textBox: FormGroup;
  focus: boolean = false;
  focused = false;
  @Output("focus") focusEvent: EventEmitter<FocusEvent> =
    new EventEmitter<FocusEvent>();
  touched = false;
  changed = false;
  modeVisual = true;
  private onChange: (value: string) => void;
  private onTouched: () => void;
  showPlaceholder = false;
  id: any;
  @Output("blur") blurEvent: EventEmitter<FocusEvent> =
    new EventEmitter<FocusEvent>();
  @ViewChild("editor", { static: false }) textArea: ElementRef;
  @ViewChild("editorWrapper", { static: false }) editorWrapper: ElementRef;
  textAreaEventSubscription: any;
  constructor(
    private r: Renderer2,
    private contentService: ContentService,
    private eRef: ElementRef,
    private editorService: AngularEditorService,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private doc: any
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

  ngAfterViewInit(): void {
   if(this.textArea){
      this.textArea.nativeElement.innerHTML = this.textBox.get('displayName').value;
    }
  }
  ngOnInit() {
    this.textAreaEventSubscription = this.contentService
      .getTextAreaEvent()
      .subscribe((response) => {
        if (response.includes(":")) {
          //Stoped functionality because not exist on panda doc
          this.id = response.split(":")[1];
          this.toggleEditorMode(this.modeVisual);
        } else if (response === "focus") {
          this.textArea.nativeElement.focus();
        } else if (response === "contentChange") {
          //Stoped functionality because not exist on panda doc
          this.onContentChange(this.textArea.nativeElement);
        }
      });
    if (this.textBox.get("focus").value) {
      this.focus = true;
      this.textBox.get("focus").setValue(false);
    }
  }
  onTextBoxChanged(event: any){
    this.textBox.get('displayName').setValue(event.target.innerHTML);
  }
  /**
   * blur event
   */
  //  onTextAreaBlur(event: FocusEvent) {
  //   /**
  //    * save selection if focussed out
  //    */

  //   this.editorService.executeInNextQueueIteration(this.editorService.saveSelection);

  //   if (typeof this.onTouched === 'function') {
  //     this.onTouched();
  //   }
  //   if (event.relatedTarget !== null) {
  //     const parent = (event.relatedTarget as HTMLElement).parentElement;
  //     if (!parent.classList.contains('angular-editor-toolbar-set') && !parent.classList.contains('ae-picker')) {
  //       this.blurEvent.emit(event);
  //       this.focused = false;
  //     }
  //   }
  // }

  onTextAreaFocus(event: FocusEvent): void {
    this.contentService.setFocusRichTextEvent(this.config);
    // if (this.focused) {
    //   // event.stopPropagation();
    //   return;
    // }
    // this.focused = true;
    // this.focusEvent.emit(event);
    // if (!this.touched || !this.changed) {
    //   this.editorService.executeInNextQueueIteration(() => {
    //     this.configure();
    //     this.touched = true;
    //   });
    // }
  }
  private configure() {
    this.editorService.uploadUrl = this.config.uploadUrl;
    this.editorService.uploadWithCredentials =
      this.config.uploadWithCredentials;
    if (this.config.defaultParagraphSeparator) {
      this.editorService.setDefaultParagraphSeparator(
        this.config.defaultParagraphSeparator
      );
    }
    if (this.config.defaultFontName) {
      this.editorService.setFontName(this.config.defaultFontName);
    }
    if (this.config.defaultFontSize) {
      this.editorService.setFontSize(this.config.defaultFontSize);
    }
  }

  onContentChange(element: HTMLElement): void {
    let html = "";
    if (this.modeVisual) {
      html = element.innerHTML;
    } else {
      html = element.innerText;
    }
    if (!html || html === "<br>") {
      html = "";
    }
    if (typeof this.onChange === "function") {
      this.onChange(
        this.config.sanitize || this.config.sanitize === undefined
          ? this.sanitizer.sanitize(SecurityContext.HTML, html)
          : html
      );
      if (!html !== this.showPlaceholder) {
        this.togglePlaceholder(this.showPlaceholder);
      }
    }
    this.changed = true;
  }
  togglePlaceholder(value: boolean): void {
    if (!value) {
      this.r.addClass(this.editorWrapper.nativeElement, "show-placeholder");
      this.showPlaceholder = true;
    } else {
      this.r.removeClass(this.editorWrapper.nativeElement, "show-placeholder");
      this.showPlaceholder = false;
    }
  }

  toggleEditorMode(bToSource: boolean) {
    let oContent: any;
    const editableElement = this.textArea.nativeElement;

    if (bToSource) {
      oContent = this.r.createText(editableElement.innerHTML);
      this.r.setProperty(editableElement, "innerHTML", "");
      this.r.setProperty(editableElement, "contentEditable", false);

      const oPre = this.r.createElement("pre");
      this.r.setStyle(oPre, "margin", "0");
      this.r.setStyle(oPre, "outline", "none");

      const oCode = this.r.createElement("code");
      this.r.setProperty(oCode, "id", "sourceText" + this.id);
      this.r.setStyle(oCode, "display", "block");
      this.r.setStyle(oCode, "white-space", "pre-wrap");
      this.r.setStyle(oCode, "word-break", "keep-all");
      this.r.setStyle(oCode, "outline", "none");
      this.r.setStyle(oCode, "margin", "0");
      this.r.setStyle(oCode, "background-color", "#fff5b9");
      this.r.setProperty(oCode, "contentEditable", true);
      this.r.appendChild(oCode, oContent);
      this.r.appendChild(oPre, oCode);
      this.r.appendChild(editableElement, oPre);

      // ToDo move to service
      this.doc.execCommand("defaultParagraphSeparator", false, "div");

      this.modeVisual = false;
      // this.viewMode.emit(false);
      oCode.focus();
    } else {
      if (this.doc.querySelectorAll) {
        this.r.setProperty(
          editableElement,
          "innerHTML",
          editableElement.innerText
        );
      } else {
        oContent = this.doc.createRange();
        oContent.selectNodeContents(editableElement.firstChild);
        this.r.setProperty(editableElement, "innerHTML", oContent.toString());
      }
      this.r.setProperty(editableElement, "contentEditable", true);
      this.modeVisual = true;
      // this.viewMode.emit(true);
      this.onContentChange(editableElement);
      editableElement.focus();
    }
    this.contentService.setToolBarEvent(!this.modeVisual);
  }

  registerOnChange(fn: any): void {
    this.onChange = (e) => (e === "<br>" ? fn("") : fn(e));
  }
  ngOnDestroy(): void {
    this.textAreaEventSubscription.unsubscribe();
  }
}
