import { Component, Input, OnInit, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ContentService } from "src/app/views/document-maker/services/content.service";

@Component({
  selector: "app-page-break",
  templateUrl: "./page-break.component.html",
  styleUrls: ["./page-break.component.scss"],
})
export class PageBreakComponent implements OnInit {
  @Input("br") public br: FormGroup;
  constructor() {}

  ngOnInit() {}
}
