import { Component, ComponentFactory, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { documentConst } from '../../../constants/document-const';
import { DateDynamicComponent } from '../date-dynamic/date-dynamic.component';
import { DropDownDynamicComponent } from '../drop-down-dynamic/drop-down-dynamic.component';
import { ImageDynamicComponent } from '../image-dynamic/image-dynamic.component';
import { TableDynamicComponent } from '../table-dynamic/table-dynamic.component';
import { TextDynamicComponent } from '../text-dynamic/text-dynamic.component';
import { TextFieldDynamicComponent } from '../text-field-dynamic/text-field-dynamic.component';
import { VideoDynamicComponent } from '../video-dynamic/video-dynamic.component';

@Component({
  selector: 'app-drag-drop-dynamic',
  templateUrl: './drag-drop-dynamic.component.html',
  styleUrls: ['./drag-drop-dynamic.component.scss']
})
export class DragDropDynamicComponent implements OnInit {

  @Input('component') public component: FormGroup;
  @ViewChild('componentHolder', { read: ViewContainerRef, static: true }) componentHolder: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private toastr: ToastrService) { }

  ngOnInit() {
    this.generateComponent();
  }
  generateComponent(){
    let componentFactory: ComponentFactory<any>;
    if (this.component.get('type').value === documentConst.BLOCKINPUT) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as TextDynamicComponent).textBox = this.component;
    }
    else if (this.component.get('type').value === documentConst.IMG) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(ImageDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as ImageDynamicComponent).Img = this.component;
    }
    else if (this.component.get('type').value === documentConst.VIDEO) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(VideoDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as VideoDynamicComponent).video = this.component;
    }
     else if (this.component.get('type').value === documentConst.TABLE) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(TableDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as TableDynamicComponent).table = this.component;
    }
    else if (this.component.get('type').value === documentConst.FIELDINPUT) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextFieldDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as TextFieldDynamicComponent).textField = this.component;
    }
    else if (this.component.get('type').value === documentConst.DROPDOWN) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(DropDownDynamicComponent);
      var cmpRef = this.componentHolder.createComponent(componentFactory);
      (cmpRef.instance as DropDownDynamicComponent).dropdown = this.component;
    }
    // else if (this.component.get('type').value === documentConst.DATE) {
    //   componentFactory = this.componentFactoryResolver.resolveComponentFactory(DateDynamicComponent);
    //   var cmpRef = this.componentHolder.createComponent(componentFactory);
    //   (cmpRef.instance as DateDynamicComponent).date = this.component;
    // }
    // else if (this.component.get('type').value === documentConst.CHECKBOX) {
    //   componentFactory = this.componentFactoryResolver.resolveComponentFactory(CheckBoxDynamicComponent);
    //   var cmpRef = this.componentHolder.createComponent(componentFactory);
    //   (cmpRef.instance as CheckBoxDynamicComponent).checkBox = this.component;
    // }

    //  else if (this.component.get('type').value === documentConst.PRICINGTABLE) {
    //   componentFactory = this.componentFactoryResolver.resolveComponentFactory(PricingTableDynamicComponent);
    //   var cmpRef = this.componentHolder.createComponent(componentFactory);
    //   (cmpRef.instance as PricingTableDynamicComponent).pricingTable = this.component;
    // }
  }
}
