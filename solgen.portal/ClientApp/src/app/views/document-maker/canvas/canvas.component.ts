import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import jsPDF from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake";
import html2canvas from "html2canvas";
import { ToastrService } from "ngx-toastr";
import domtoimage from "dom-to-image";
import { AdvancedPropertiesModalComponent } from "../../shared/components/advanced-properties-modal/advanced-properties-modal.component";
import { documentConst } from "../../shared/constants/document-const";
import { ContentService } from "../services/content.service";

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.scss"],
})
export class CanvasComponent implements OnInit, OnDestroy {
  droppedControlSubscription: any;
  duplicateControlSubscription: any;
  deleteControlSubscription: any;
  advancedPropertiesSubscription: any;
  @ViewChild("pdfContent", { static: false }) pdfContent: ElementRef;
  @ViewChild("containerElm", { static: false }) el: ElementRef;
  @Input("isPreview") isPreview: boolean = false;
  @ViewChild("advancedPropertiesModal", {
    read: ViewContainerRef,
    static: true,
  })
  advancedPropertiesModal: ViewContainerRef;
  @Input("document") document: FormGroup;
  @ViewChild("propertiesModal", { static: false })
  advancedSettingsModal: AdvancedPropertiesModalComponent;

  constructor(
    private contentService: ContentService,
    private toastrService: ToastrService
  ) {}

  downloadPDF() {
    var node = document.getElementById("pdfContent");

    var img;
    var filename;
    var newImage;

    domtoimage
      .toPng(node, { bgcolor: "#fff" })

      .then(function (dataUrl) {
        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = function () {
          var pdfWidth = img.width;
          var pdfHeight = img.height;

          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

          var doc;

          if (pdfWidth > pdfHeight) {
            doc = new jsPDF("l", "px", [pdfWidth, pdfHeight]);
          } else {
            doc = new jsPDF("p", "px", [pdfWidth, pdfHeight]);
          }

          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();

          doc.addImage(newImage, "PNG", 10, 10, width, height);
          filename = "mypdf_" + ".pdf";
          doc.save(filename);
        };
      })
      .catch(function (error) {
        // Error Handling
      });
  }
  htmltoPDF() {
    html2canvas(document.querySelector("#pdfContent")).then((canvas) => {
      var pdf = new jsPDF("p", "pt", [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save("document.pdf");
    });
  }
  get getPages() {
    return this.document.get(documentConst.PAGES) as FormArray;
  }
  getComponent(page: any) {
    return page.get(documentConst.COMPONENTS) as FormArray;
  }
  dropedControl;
  ngOnInit() {
    this.advancedPropertiesSubscription = this.contentService
      .getAdvancedProperty()
      .subscribe((control) => {
        this.advancedSettingsModal.showPopup(control);
      });
    this.droppedControlSubscription = this.contentService
      .getDroppedControl()
      .subscribe((control) => {
        this.dropedControl = control;
      });
    this.duplicateControlSubscription = this.contentService
      .getDuplicateControl()
      .subscribe((control) => {
        control.focus = true;
        this.getPageControls(control.pageId).push(
          this.contentService.buildComponentFormGroup(control)
        );
      });
    this.deleteControlSubscription = this.contentService
      .getDeleteEvent()
      .subscribe((control) => {
        var comp = this.getPageControls(control.pageId);
        var index = comp.controls.findIndex(
          (x) => x.get("id").value == control.id
        );
        comp.removeAt(index);
      });
  }
  getPageControls(pageIndex) {
    return this.getPages.controls[pageIndex].get(
      documentConst.COMPONENTS
    ) as FormArray;
  }
  drop(event, pageIndex) {
    if (this.dropedControl.type === documentConst.BR) {
      this.contentService.onPageAdd.emit(pageIndex);
    }
    if (
      this.dropedControl.type === documentConst.SIGNATURE ||
      this.dropedControl.type === documentConst.INITIALS ||
      this.dropedControl.type === documentConst.CARD ||
      this.dropedControl.type === documentConst.FILE
    ) {
      this.toastrService.info("In Porgress");
    } else {
      const { x, y, bottom, right } =
        this.el.nativeElement.getBoundingClientRect();
      this.getPageControls(pageIndex).push(
        this.contentService.buildComponentFormGroup(
          this.contentService.generateComponentDto(
            this.dropedControl.type,
            event,
            x,
            y,
            bottom,
            right,
            pageIndex
          )
        )
      );
    }
  }

  ngOnDestroy() {
    this.droppedControlSubscription.unsubscribe();
    this.duplicateControlSubscription.unsubscribe();
    this.deleteControlSubscription.unsubscribe();
    this.advancedPropertiesSubscription.unsubscribe();
  }
}
