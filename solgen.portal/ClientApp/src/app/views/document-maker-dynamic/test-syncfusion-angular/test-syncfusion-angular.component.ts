import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentEditorContainer, DocumentEditorContainerComponent, EditorService, SelectionService, SfdtExportService, TextExportService, ToolbarService, WordExportService } from '@syncfusion/ej2-angular-documenteditor';
import { CommonService } from '../../shared/common.service';
import { DocumentMakerService } from '../services/document-maker.service';

@Component({
  selector: 'app-test-syncfusion-angular',
  templateUrl: './test-syncfusion-angular.component.html',
  styleUrls: ['./test-syncfusion-angular.component.scss'],
  providers: [ToolbarService, EditorService, SelectionService, SfdtExportService,WordExportService,TextExportService]
})
export class TestSyncfusionAngularComponent implements OnInit {
  @ViewChild('documentEditor', {static : false})
  public document: DocumentEditorContainer;
  constructor(private commonService: CommonService,private DocumentMakerService: DocumentMakerService) { }

  ngOnInit() {
  }

  saveAsDocx() :void {
    // this.document.documentEditor.save("Sample","Docx");
    let list = this.document.documentEditor.serialize();
    // this.document.documentEditor.saveAsBlob('Docx').then((exportedDocument: Blob) => {
    //   var url = window.URL.createObjectURL(exportedDocument);
    //   // var fileURL = URL.createObjectURL(url);
    //   window.open(url);
    //   // The blob can be processed further
    //   // var byteCharacters = atob(response.Bytes);
    //   // var byteCharacters =  atob(exportedDocument.toString())
    //   // var byteNumbers = new Array(byteCharacters.length);
    //   // for (var i = 0; i < byteCharacters.length; i++) {
    //   //    byteNumbers[i] = byteCharacters.charCodeAt(i);
    //   // }
    //   // var byteArray = new Uint8Array(byteNumbers);
    //   // var blob = new Blob([byteArray], {type: "application/pdf"});
    //   // var fileURL = URL.createObjectURL(blob);
    //   // window.open(fileURL, '_blank');
    // });
    // this.DocumentMakerService.previewPDf(list).subscribe(result => {
    //   var response = this.commonService.base64ToArrayBuffer(result);
    //   let file = new Blob([response], { type: 'application/pdf' });
    //   var fileURL = URL.createObjectURL(file);
    //   window.open(fileURL);
    // });
    // this.document.documentEditor.save("Sample","Html");
  }

//   this.http.get(myUrl).subscribe(response => {
//     var byteCharacters = atob(response.Bytes);
//     var byteNumbers = new Array(byteCharacters.length);
//     for (var i = 0; i < byteCharacters.length; i++) {
//        byteNumbers[i] = byteCharacters.charCodeAt(i);
//     }
//     var byteArray = new Uint8Array(byteNumbers);
//     var blob = new Blob([byteArray], {type: "application/pdf"});
//     var fileURL = URL.createObjectURL(blob);
//     window.open(fileURL, '_blank');
//  })


}
