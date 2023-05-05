import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { DataService } from "../services/data.service";
import { Location } from "@angular/common";
import { jsPDF } from "jspdf";

@Component({
  selector: "app-document-preview",
  templateUrl: "./document-preview.component.html",
  styleUrls: ["./document-preview.component.scss"],
})
export class DocumentPreviewComponent implements OnInit {
  document: FormGroup;
  isPreview: boolean = true;

  constructor(private dataSerivce: DataService, private location: Location) {}

  ngOnInit() {
    this.document = this.dataSerivce.document;
  }

  onBack() {
    // let page = (this.document.get('pages') as FormArray);
    // page.controls.forEach(item=>{
    //   let a = item.get('components') as FormArray;
    //   a.controls.forEach(item2=>{
    //     item2.get('isPreview').setValue(true);
    //   })
    // });
    this.location.back();
  }
}
