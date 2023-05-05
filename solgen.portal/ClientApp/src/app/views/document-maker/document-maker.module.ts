import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DocumentMakerRoutingModule } from "./document-maker-routing.module";
import { CanvasComponent } from "./canvas/canvas.component";
import { ContentComponent } from "./content/content.component";
import { DocumentComponent } from "./document/document.component";
import { SharedModule } from "../shared/shared.module";
import { DragDropModule } from "primeng/dragdrop";
import { ImageComponent } from "../shared/components/image/image.component";
import { TextComponent } from "../shared/components/text/text.component";
import { VideoComponent } from "../shared/components/video/video.component";
import { TableComponent } from "../shared/components/table/table.component";
import { TextFieldComponent } from "../shared/components/text-field/text-field.component";
import { CheckBoxComponent } from "../shared/components/check-box/check-box.component";
import { DropDownComponent } from "../shared/components/drop-down/drop-down.component";
import { DateComponent } from "../shared/components/date/date.component";
import { PricingTableComponent } from "../shared/components/pricing-table/pricing-table.component";
import { DocumentPreviewComponent } from "./document-preview/document-preview.component";
import { PageBreakComponent } from "../shared/components/page-break/page-break.component";

@NgModule({
  declarations: [
    CanvasComponent,
    ContentComponent,
    DocumentComponent,
    DocumentPreviewComponent,
  ],
  entryComponents: [
    ImageComponent,
    TextComponent,
    VideoComponent,
    TextFieldComponent,
    TableComponent,
    CheckBoxComponent,
    DropDownComponent,
    DateComponent,
    PricingTableComponent,
    PageBreakComponent,
  ],
  imports: [
    CommonModule,
    DocumentMakerRoutingModule,
    SharedModule,
    DragDropModule,
  ],
})
export class DocumentMakerModule {}
