import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentFactory,
} from "@angular/core";
import { ImageComponent } from "../image/image.component";
import { TextComponent } from "../text/text.component";
import { FormGroup } from "@angular/forms";
import { documentConst } from "../../constants/document-const";
import { componentBase } from "src/app/views/document-maker/dto/document-creation";
import { ContentService } from "src/app/views/document-maker/services/content.service";
import { VideoComponent } from "../video/video.component";
import { TableComponent } from "../table/table.component";
import { TableService } from "../table/services/table.service";
import { TextFieldComponent } from "../text-field/text-field.component";
import { CheckBoxComponent } from "../check-box/check-box.component";
import { ToastrService } from "ngx-toastr";
import { DropDownComponent } from "../drop-down/drop-down.component";
import { DateComponent } from "../date/date.component";
import { PricingTableComponent } from "../pricing-table/pricing-table.component";
import { PageBreakComponent } from "../page-break/page-break.component";
const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2,
}

@Component({
  selector: "app-resizable-draggable",
  templateUrl: "./resizable-draggable.component.html",
  styleUrls: ["./resizable-draggable.component.scss"],
})
export class ResizableDraggableComponent implements OnInit, AfterViewInit {
  @Input("component") public component: FormGroup;
  @Input("isPreview") public isPreview: boolean;

  @ViewChild("box", { static: false }) public box: ElementRef;
  private boxPosition: { left: number; top: number };
  private containerPos: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  public mouse: { x: number; y: number };
  public status: Status = Status.OFF;
  private mouseClick: { x: number; y: number; left: number; top: number };
  @ViewChild("componentHolder", { read: ViewContainerRef, static: true })
  componentHolder: ViewContainerRef;
  nextElement: number = 70;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private contentService: ContentService,
    public tableService: TableService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.component.get("isPreview").setValue(this.isPreview);
    this.generateComponent();
  }

  ngAfterViewInit() {
    this.loadBox();
    this.loadContainer();
  }

  private loadBox() {
    if (this.box) {
      const { left, top, right, bottom } =
        this.box.nativeElement.getBoundingClientRect();
      this.boxPosition = { left, top };
    }
  }

  private loadContainer() {
    const left = this.boxPosition.left - this.component.get("marginLeft").value;
    const top = this.boxPosition.top - this.component.get("marginTop").value;
    const right = this.component.get("marginRight").value;
    const bottom =
      this.boxPosition.top - this.component.get("marginBottom").value;
    this.containerPos = { left, top, right, bottom };
  }

  setStatus(event: MouseEvent, status: number) {
    if (status === 1) event.stopPropagation();
    else if (status === 2)
      this.mouseClick = {
        x: event.clientX,
        y: event.clientY,
        left: this.component.get("marginLeft").value,
        top: this.component.get("marginTop").value,
      };
    else this.loadBox();
    this.status = status;
  }

  @HostListener("window:mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX, y: event.clientY };

    if (this.status === Status.RESIZE) this.resize();
    else if (this.status === Status.MOVE) this.move();
  }

  private resize() {
    if (this.resizeCondMeet() && !this.isPreview) {
      this.component
        .get("width")
        .setValue(
          Number(this.mouse.x > this.boxPosition.left)
            ? this.mouse.x - this.boxPosition.left
            : 20
        );
      this.component
        .get("height")
        .setValue(
          Number(this.mouse.y > this.boxPosition.top)
            ? this.mouse.y - this.boxPosition.top
            : 20
        );
    }
  }

  private resizeCondMeet() {
    return (
      this.mouse.x < this.containerPos.right &&
      this.mouse.x > this.containerPos.left + 40
      //this.mouse.y < this.containerPos.bottom &&
      // this.mouse.y > this.containerPos.top + 40
    );
  }

  private move() {
    if (this.moveCondMeet() && !this.isPreview) {
      this.component
        .get("marginLeft")
        .setValue(this.mouseClick.left + (this.mouse.x - this.mouseClick.x));
      this.component
        .get("marginTop")
        .setValue(this.mouseClick.top + (this.mouse.y - this.mouseClick.y));
    }
  }

  private moveCondMeet() {
    const offsetLeft = this.mouseClick.x - this.boxPosition.left;
    const offsetRight = this.component.get("width").value - offsetLeft;
    const offsetTop = this.mouseClick.y - this.boxPosition.top;
    const offsetBottom = this.component.get("height").value - offsetTop;
    return (
      this.mouse.x > this.containerPos.left + offsetLeft &&
      this.mouse.x < this.containerPos.right - offsetRight
      //  this.mouse.y > this.containerPos.top + offsetTop
      // this.mouse.y < this.containerPos.bottom - offsetBottom
    );
  }

  duplicateControl() {
    let newControl: componentBase = JSON.parse(
      JSON.stringify(this.component.value)
    );
    if (newControl.type === documentConst.DATE) {
      newControl.displayName = null;
    }
    newControl.marginTop += this.nextElement;
    this.contentService.setToolBarProperty(false);
    newControl.id = this.contentService.getUniqueId();
    this.contentService.setDuplicateControl(newControl);
  }

  deleteControl() {
    this.contentService.setToolBarProperty(false);
    this.contentService.raiseDeleteEvent(this.component.value);
  }
  advancedSettings() {
    if (
      this.component.get("type").value === documentConst.CHECKBOX ||
      this.component.get("type").value === documentConst.PRICINGTABLE
    ) {
      this.toastr.info("In progress");
    } else {
      this.contentService.setAdvancedProperty(this.component);
    }
  }

  generateComponent() {
    let componentFactory: ComponentFactory<any>;
    if (this.component.get("type").value === documentConst.BLOCKINPUT) {
      componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(TextComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as TextComponent).textBox = this.component;
    } else if (this.component.get("type").value === documentConst.IMG) {
      componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(ImageComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as ImageComponent).Img = this.component;
    } else if (this.component.get("type").value === documentConst.VIDEO) {
      componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(VideoComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as VideoComponent).video = this.component;
    } else if (this.component.get("type").value === documentConst.FIELDINPUT) {
      componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(
          TextFieldComponent
        );
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as TextFieldComponent).textField = this.component;
    } else if (this.component.get("type").value === documentConst.TABLE) {
      componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(TableComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as TableComponent).table = this.component;
    } else if (this.component.get("type").value === documentConst.CHECKBOX) {
      componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(
          CheckBoxComponent
        );
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as CheckBoxComponent).checkBox = this.component;
    } else if (this.component.get("type").value === documentConst.DROPDOWN) {
      componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(
          DropDownComponent
        );
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as DropDownComponent).dropdown = this.component;
    } else if (this.component.get("type").value === documentConst.DATE) {
      componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(DateComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as DateComponent).date = this.component;
    } else if (
      this.component.get("type").value === documentConst.PRICINGTABLE
    ) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        PricingTableComponent
      );
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as PricingTableComponent).pricingTable = this.component;
    } else if (this.component.get("type").value === documentConst.BR) {
      componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(
          PageBreakComponent
        );
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as PageBreakComponent).br = this.component;
    }
  }
}
