import { Component, ComponentFactory, ComponentFactoryResolver, ElementRef, HostListener, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { column } from 'src/app/views/document-maker-dynamic/dto/document-creation';
import { ContentService } from 'src/app/views/document-maker-dynamic/services/content.service';
import { documentConst } from '../../../constants/document-const';
import { CheckBoxDynamicComponent } from '../check-box-dynamic/check-box-dynamic.component';
import { DateDynamicComponent } from '../date-dynamic/date-dynamic.component';
import { DropDownDynamicComponent } from '../drop-down-dynamic/drop-down-dynamic.component';
import { ImageDynamicComponent } from '../image-dynamic/image-dynamic.component';
import { PricingTableDynamicComponent } from '../pricing-table-dynamic/pricing-table-dynamic.component';
import { TableService } from '../table-dynamic/services/table.service';
import { TableDynamicComponent } from '../table-dynamic/table-dynamic.component';
import { TextDynamicComponent } from '../text-dynamic/text-dynamic.component';
import { TextFieldDynamicComponent } from '../text-field-dynamic/text-field-dynamic.component';
import { VideoDynamicComponent } from '../video-dynamic/video-dynamic.component';
const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2,
}
@Component({
  selector: 'app-resizable-draggable-dynamic',
  templateUrl: './resizable-draggable-dynamic.component.html',
  styleUrls: ['./resizable-draggable-dynamic.component.scss']
})
export class ResizableDraggableDynamicComponent implements OnInit {

  @Input('component') public component: FormGroup;
  @ViewChild('box', { static: false }) public box: ElementRef;
  private boxPosition: { left: number; top: number };
  private containerPos: { left: number; top: number; right: number; bottom: number };
  public mouse: { x: number; y: number };
  public status: Status = Status.OFF;
  private mouseClick: { x: number; y: number; left: number; top: number };
  @ViewChild('componentHolder', { read: ViewContainerRef, static: true }) componentHolder: ViewContainerRef;
  nextElement: number = 70;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private contentService: ContentService,
    public tableService: TableService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.generateComponent();
  }

  ngAfterViewInit() {
    this.loadBox();
    this.loadContainer();
  }

  private loadBox() {
    if (this.box) {
      const { left, top, right, bottom } = this.box.nativeElement.getBoundingClientRect();
      this.boxPosition = { left, top };
    }
  }

  private loadContainer() {
    const left = this.boxPosition.left - this.component.get('marginLeft').value;
    const top = this.boxPosition.top - this.component.get('marginTop').value;
    const right = this.component.get('marginRight').value;
    const bottom = this.boxPosition.top - this.component.get('marginBottom').value;
    this.containerPos = { left, top, right, bottom };
  }

  setStatus(event: MouseEvent, status: number) {
    if (status === 1) event.stopPropagation();
    else if (status === 2)
      this.mouseClick = {
        x: event.clientX,
        y: event.clientY,
        left: this.component.get('marginLeft').value,
        top: this.component.get('marginTop').value,
      };
    else this.loadBox();
    this.status = status;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX, y: event.clientY };

    if (this.status === Status.RESIZE) this.resize();
    else if (this.status === Status.MOVE) this.move();
  }

  private resize() {
    if (this.resizeCondMeet()) {
      this.component.get('width').setValue(Number(this.mouse.x > this.boxPosition.left) ? this.mouse.x - this.boxPosition.left : 20);
      this.component.get('height').setValue(Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top : 20);
    }
  }

  private resizeCondMeet() {
    return (
      this.mouse.x < this.containerPos.right &&
      this.mouse.x > this.containerPos.left + 40 &&
      this.mouse.y < this.containerPos.bottom &&
      this.mouse.y > this.containerPos.top + 40
    );
  }

  private move() {
    if (this.moveCondMeet()) {
      this.component.get('marginLeft').setValue(this.mouseClick.left + (this.mouse.x - this.mouseClick.x));
      this.component.get('marginTop').setValue(this.mouseClick.top + (this.mouse.y - this.mouseClick.y));
    }
  }

  private moveCondMeet() {
    const offsetLeft = this.mouseClick.x - this.boxPosition.left;
    const offsetRight = this.component.get('width').value - offsetLeft;
    const offsetTop = this.mouseClick.y - this.boxPosition.top;
    const offsetBottom = this.component.get('height').value - offsetTop;
    return (
      this.mouse.x > this.containerPos.left + offsetLeft &&
      this.mouse.x < this.containerPos.right - offsetRight &&
      this.mouse.y > this.containerPos.top + offsetTop &&
      this.mouse.y < this.containerPos.bottom - offsetBottom
    );
  }

  duplicateControl() {
    let newControl: column = JSON.parse(JSON.stringify(this.component.value));
    if (newControl.type === documentConst.DATE) {
      newControl.fieldName = null;
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
    if (this.component.get('type').value === documentConst.CHECKBOX || this.component.get('type').value === documentConst.PRICINGTABLE) {
      this.toastr.info('In progress');
    } else {
      this.contentService.setAdvancedProperty(this.component);
    }
  }

  generateComponent(){
    let componentFactory: ComponentFactory<any>;
    if (this.component.get('type').value === documentConst.BLOCKINPUT) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as TextDynamicComponent).textBox = this.component;
    } else if (this.component.get('type').value === documentConst.IMG) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(ImageDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as ImageDynamicComponent).Img = this.component;
    } else if (this.component.get('type').value === documentConst.VIDEO) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(VideoDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as VideoDynamicComponent).video = this.component;
    } else if (this.component.get('type').value === documentConst.FIELDINPUT) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextFieldDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as TextFieldDynamicComponent).textField = this.component;
    } else if (this.component.get('type').value === documentConst.TABLE) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(TableDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as TableDynamicComponent).table = this.component;
    } else if (this.component.get('type').value === documentConst.CHECKBOX) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(CheckBoxDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as CheckBoxDynamicComponent).checkBox = this.component;
    } else if (this.component.get('type').value === documentConst.DROPDOWN) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(DropDownDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as DropDownDynamicComponent).dropdown = this.component;
    } else if (this.component.get('type').value === documentConst.DATE) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(DateDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as DateDynamicComponent).date = this.component;
    } else if (this.component.get('type').value === documentConst.PRICINGTABLE) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(PricingTableDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as PricingTableDynamicComponent).pricingTable = this.component;
    }
  }

}
