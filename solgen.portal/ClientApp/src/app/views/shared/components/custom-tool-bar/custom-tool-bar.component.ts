import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ContentService } from 'src/app/views/document-maker/services/content.service';
import { AngularEditorToolbarComponent } from '../../thirdParty/lib/angular-editor-toolbar.component';
import { AngularEditorService } from '../../thirdParty/lib/angular-editor.service';
import { angularEditorConfig } from '../../thirdParty/lib/config';

@Component({
  selector: 'app-custom-tool-bar',
  templateUrl: './custom-tool-bar.component.html',
  styleUrls: ['./custom-tool-bar.component.scss']
})
export class CustomToolBarComponent implements OnInit, OnDestroy {
  @Input('config') config: any;
  @ViewChild('editorToolbar', {static: false}) editorToolbar: AngularEditorToolbarComponent;
  @Output() viewMode = new EventEmitter<boolean>();

  private onTouched: () => void;
  @Input() id = '';

  focusInstance: any;
  blurInstance: any;

  changed = false;
  focused = false;
  toolBarEventSubscription : any;
  // modeVisual = true;
  constructor(private r: Renderer2, @Inject(DOCUMENT) private doc: any,
  private editorService: AngularEditorService, private contentService: ContentService) { }
  ngOnInit() {
    this.toolBarEventSubscription =  this.contentService.getToolBarEvent().subscribe(response =>{
      this.editorToolbar.setEditorMode(response);
    });
  }

  getFonts() {
    const fonts = this.config.fonts ? this.config.fonts : angularEditorConfig.fonts;
    return fonts.map(x => {
      return {label: x.name, value: x.name};
    });
  }

  executeCommand(command: string) {
    this.focus();
    if (command === 'toggleEditorMode') { //html commented because not exist on panda doc
      this.contentService.setTextAreaEvent("toggleEditorMode:" + this.id);
    } else if (command !== '') {
      if (command === 'clear') {
        this.editorService.removeSelectedElements(this.getCustomTags());
        this.contentService.setTextAreaEvent("contentChange");
      } else if (command === 'default') { //html commented because not exist on panda doc
        this.editorService.removeSelectedElements('h1,h2,h3,h4,h5,h6,p,pre');
        this.contentService.setTextAreaEvent("contentChange");
      } else {
        this.editorService.executeCommand(command);
      }
      this.exec();
    }
  }
  focus() {
    this.contentService.setTextAreaEvent("focus");
    // else {
    //   const sourceText = this.doc.getElementById('sourceText' + this.id);
    //   sourceText.focus();
    //   this.focused = true;
    // }
  }




  getCustomTags() {
    const tags = ['span'];
    this.config.customClasses.forEach(x => {
      if (x.tag !== undefined) {
        if (!tags.includes(x.tag)) {
          tags.push(x.tag);
        }
      }
    });
    return tags.join(',');
  }

  exec() {
    this.editorToolbar.triggerButtons();

    let userSelection;
    if (this.doc.getSelection) {
      userSelection = this.doc.getSelection();
      this.editorService.executeInNextQueueIteration(this.editorService.saveSelection);
    }

    let a = userSelection.focusNode;
    const els = [];
    while (a && a.id !== 'editor') {
      els.unshift(a);
      a = a.parentNode;
    }
    this.editorToolbar.triggerBlocks(els);
  }
  ngOnDestroy(): void {
    this.toolBarEventSubscription.unsubscribe();
  }
}
