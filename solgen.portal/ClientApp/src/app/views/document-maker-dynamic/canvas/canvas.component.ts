import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import {AdvancedPropertiesModalDynamicComponent} from '../../shared/components/document-dynamic/advanced-properties-modal-dynamic/advanced-properties-modal-dynamic.component';
import { documentConst } from '../../shared/constants/document-const';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, OnDestroy {
  droppedControlSubscription: any;
  duplicateControlSubscription: any;
  deleteControlSubscription: any;
  advancedPropertiesSubscription: any;
  @ViewChild('containerElm', { static: false }) el: ElementRef;
  @ViewChild('advancedPropertiesModal', { read: ViewContainerRef, static: true }) advancedPropertiesModal: ViewContainerRef;
  @Input('document') document: FormGroup;
  @ViewChild('propertiesModal', { static: false }) advancedSettingsModal: AdvancedPropertiesModalDynamicComponent;

  constructor(private contentService: ContentService) {}
  get getRows() {
    return this.document.get(documentConst.ROWS) as FormArray;
  }
  getColumns(row: any) {
    return row.get(documentConst.COLUMNS) as FormArray;
  }
  dropedControl;
  ngOnInit() {
    this.advancedPropertiesSubscription = this.contentService.getAdvancedProperty().subscribe((control) => {
      this.advancedSettingsModal.showPopup(control);
    });
    this.droppedControlSubscription = this.contentService.getDroppedControl().subscribe((control) => {
      this.dropedControl = control;
    });
    // this.duplicateControlSubscription = this.contentService.getDuplicateControl().subscribe((control) => {
    //   control.focus = true;
    //   this.getPageControls(control.rowId).push(this.contentService.buildComponentFormGroup(control));
    // });
    // this.deleteControlSubscription = this.contentService.getDeleteEvent().subscribe((control) => {
    //   var comp = this.getPageControls(control.rowId);
    //   var index = comp.controls.findIndex((x) => x.get('id').value == control.id);
    //   comp.removeAt(index);
    // });
  }
  getColumn(rowIndex) {
    return this.getRows.controls[rowIndex].get(documentConst.COLUMNS) as FormArray;
  }
  dropRow(event) {
    const { x, y, bottom, right } = this.el.nativeElement.getBoundingClientRect();
    this.getRows.push(this.contentService.buildRowFormGroup(null));
    (this.getRows.controls[this.getRows.length - 1].get('columns') as FormArray).push(
      this.contentService.buildColumnFormGroup(
        this.contentService.generateComponentDto(this.dropedControl.type, event, x, y, bottom, right, this.getRows.length - 1)
      )
    )
  }

  dropColumn(event, rowIndex){
    const { x, y, bottom, right } = this.el.nativeElement.getBoundingClientRect();
    (this.getRows.controls[rowIndex].get('columns') as FormArray).push(
      this.contentService.buildColumnFormGroup(
        this.contentService.generateComponentDto(this.dropedControl.type, event, x, y, bottom, right, rowIndex)
      )
    )
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.droppedControlSubscription.unsubscribe();
    this.duplicateControlSubscription.unsubscribe();
    this.deleteControlSubscription.unsubscribe();
    this.advancedPropertiesSubscription.unsubscribe();
  }
}
