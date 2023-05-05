import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AvailableDatesConst, DateFormatConst, documentConst, validationConst } from '../../shared/constants/document-const';
import { AngularEditorConfig } from '../../shared/thirdParty/lib/config';
import { ContentItem } from '../dto/content';
import { column, document, documentMaker, row } from '../dto/document-creation';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private fb: FormBuilder) { }
  private blocks: ContentItem[] = [
    new ContentItem(documentConst.BLOCKINPUT, 'Text', 800, 'fa fa-text-width', '1', 'class list'),
    new ContentItem(documentConst.IMG, 'Image', 800, 'fa fa-picture-o', '1', 'class list'),
    new ContentItem(documentConst.VIDEO, 'Video', 800, 'fa fa-video-camera', '1', 'class list'),
    new ContentItem(documentConst.TABLE, 'Table', 800, 'fa fa-table', '1', 'class list'),
    new ContentItem(documentConst.PRICINGTABLE, 'Pricing Table', 800, 'fa fa-th', '1', 'class list'),
    new ContentItem(documentConst.TABLEOFCONTENT, 'Table of contents', 800, 'fa fa-th-large', '1', 'class list'),
    new ContentItem(documentConst.BR, 'Page Break', 800, 'fa fa-scissors', '1', 'class list'),
  ];

  private fields: ContentItem[] = [
    new ContentItem(documentConst.FIELDINPUT, 'Text Field', 800, 'fa fa-font', '1', 'class list'),
    new ContentItem(documentConst.SIGNATURE, 'Signature', 800, 'fa fa-sign-language', '1', 'class list'),
    new ContentItem(documentConst.INITIALS, 'Initials', 800, 'fa fa-h-square', '1', 'class list'),
    new ContentItem(documentConst.DATE, 'Date', 800, 'fa fa-calendar', '1', 'class list'),
    new ContentItem(documentConst.CHECKBOX, 'Checkbox', 800, 'feather-check-square', '1', 'class list'),
    new ContentItem(documentConst.DROPDOWN, 'Dropdown', 800, 'fa fa-caret-square-o-down', '1', 'class list'),
    new ContentItem(documentConst.CARD, 'Card details', 800, 'fa fa-address-card-o', '1', 'class list'),
    new ContentItem(documentConst.FILE, 'Collect files', 800, 'fa fa-upload', '1', 'class list'),
  ];
  private droppedControl = new Subject<ContentItem>();
  private duplicateControl = new Subject<column>();
  private deleteControl = new Subject<column>();
  private advancedPropertiesModal = new Subject<FormGroup>();
  private toolBarEvent = new Subject<boolean>();
  private focusRichTextEvent = new Subject<AngularEditorConfig>();
  private textAreaEvent = new Subject<string>();
  private editorWrapperEvent = new Subject<string>();
  private editorToolbarEvent = new Subject<boolean>();
  private validationEvent = new Subject<any>();
  private dropdownValuesEvent = new Subject<any>();
  private dateFormatEvent = new Subject<any>();
  private dateLimitEvent = new Subject<any>();
  private document: FormGroup;

  get blockContents() {
    return this.blocks;
  }

  get getFeilds() {
    return this.fields;
  }
  // drag & drop controls start
  setDroppedControl(control: ContentItem) {
    this.droppedControl.next(control);
  }

  getDroppedControl(): Observable<ContentItem> {
    return this.droppedControl.asObservable();
  }

  // drag & drop controls end

  // duplicate controls start
  setDuplicateControl(control: column) {
    this.duplicateControl.next(control);
  }

  getDuplicateControl() {
    return this.duplicateControl.asObservable();
  }
  // duplicate controls end

  // delete controls start
  raiseDeleteEvent(control: column) {
    this.deleteControl.next(control);
  }

  getDeleteEvent() {
    return this.deleteControl.asObservable();
  }
  // delete controls end

  //advanced properties start
  setAdvancedProperty(control: FormGroup) {
    this.advancedPropertiesModal.next(control);
  }

  getAdvancedProperty() {
    return this.advancedPropertiesModal.asObservable();
  }
  //advanced properties end

  //Show tool bar start
  setToolBarProperty(value: boolean) {
    this.toolBarEvent.next(value);
  }
  getToolBarProperty() {
    return this.toolBarEvent.asObservable();
  }

  //Show tool bar end

  //Show tool bar start
  setFocusRichTextEvent(configObj: AngularEditorConfig) {
    this.focusRichTextEvent.next(configObj);
  }
  getFocusRichTextEvent() {
    return this.focusRichTextEvent.asObservable();
  }
  //Show tool bar end

  // text area event start
  setTextAreaEvent(methodName: string) {
    this.textAreaEvent.next(methodName);
  }
  getTextAreaEvent() {
    return this.textAreaEvent.asObservable();
  }
  // text area event end

  // edit wrapper event start
  setEditWrapperEvent() {
    this.editorWrapperEvent.next();
  }
  getEditWrapperEvent() {
    return this.editorWrapperEvent.asObservable();
  }
  // edit wrapper event end

  // validation event start for text area
  setValidationEvent() {
    this.validationEvent.next();
  }
  getValidationEvent() {
    return this.validationEvent.asObservable();
  }
  // validation event end for text area

  // edit tool bar event start
  setToolBarEvent(value: boolean) {
    this.editorToolbarEvent.next(value);
  }
  getToolBarEvent() {
    return this.editorToolbarEvent.asObservable();
  }
  // edit tool bar event end

  //Drop down values event start
  setDropdownValuesEvent(itemsList: any) {
    this.dropdownValuesEvent.next(itemsList);
  }
  getDropdownValuesEvent() {
    return this.dropdownValuesEvent.asObservable();
  }
  //Drop down values event end
  //Generate duplicate ID
  getUniqueId(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  // date limit event start
  setDateLimitEvent() {
    this.dateLimitEvent.next();
  }
  getDateLimitEvent() {
    return this.dateLimitEvent.asObservable();
  }

  // date format event start
  setDateFormatEvent() {
    this.dateFormatEvent.next();
  }
  getDateFormatEvent() {
    return this.dateFormatEvent.asObservable();
  }

  //Generate component
  // generateComponentDto(componentType, event, positionX, positionY, positionBottom, positionRight, pageIndex) {
  //   let component = new componentBase();
  //   if (componentType === documentConst.FIELDINPUT) {
  //     component.width = 200;
  //     component.height = 40;
  //     component.placeHolder = 'Enter Value';
  //     component.selectedValidation = validationConst.NONE;
  //     component.marginLeft = event.clientX - positionX;
  //   } else if (componentType === documentConst.CHECKBOX) {
  //     component.width = 170;
  //     component.height = 40;
  //     component.marginLeft = event.clientX - positionX;
  //   } else if(componentType === documentConst.DATE){
  //     component.placeHolder = 'Select date';
  //     component.selectedDateFormat = DateFormatConst.YYYY_WITH_DASH;
  //     component.dateLimit = AvailableDatesConst.ANY_DATES;
  //     component.marginLeft = event.clientX - positionX;
  //   } else if (componentType === documentConst.DROPDOWN) {
  //     component.width = 170;
  //     component.height = 70;
  //     component.placeHolder = 'Please select...';
  //     component.marginLeft = event.clientX - positionX;
  //   } else if (componentType === documentConst.PRICINGTABLE) {
  //     component.isPriceTable = true;
  //     component.pricingTableColumns = [{ header: 'Name', type: 'text', disabled: false, fieldCode: 'name' }, { header: 'Price', type: 'number', disabled: false, fieldCode: 'price' },{ header: 'Quantity', type: 'number', disabled: false, fieldCode: 'quantity' },{ header: 'Sub total', type: 'number', disabled: true, fieldCode: 'subTotal', calcluateValue: ['quantity', 'price']}];
  //     for (let index = 0; index < 3; index++) {
  //       let obj: any = {}
  //       component.pricingTableColumns.forEach(column => {
  //         obj[column.fieldCode] = '';
  //       });
  //       component.pricingTableRows.push(obj);
  //     }
  //     component.aggreateTable = [{header: 'Sub Total', type: "number", fieldCode: 'subTotal', isMapped: true},{header: 'Discount', type: "number", fieldCode: 'discount', isMapped: false},{header: 'Tax', type: "number", fieldCode: 'tax', isMapped: false},{header: 'Total', type: "number", fieldCode: 'total', isMapped: false}]
  //   } else {
  //     component.width = positionRight - positionX - 20;
  //     component.height = 70;
  //     component.marginLeft = 0;
  //   }
  //   component.type = componentType;
  //   component.marginTop = event.clientY - positionY;
  //   component.id = this.getUniqueId();
  //   component.pageId = pageIndex;
  //   component.marginRight = positionRight;
  //   component.marginBottom = event.clientY - positionBottom;
  //   component.focus = false;
  //   return component;
  // }
  // get getPages() {
  //   return this.document.get(documentConst.PAGES) as FormArray;
  // }
  generateComponentDto(componentType, event, positionX, positionY, positionBottom, positionRight, rowIndex) {
    let component = new column();
    component.width = positionRight - positionX - 20;
    component.height = 50;
    component.marginLeft = 0;
    component.type = componentType;
    component.marginTop = 20;
    component.id = this.getUniqueId();
    component.rowId = rowIndex;
    component.marginRight = positionRight;
    component.marginBottom = event.clientY - positionBottom;
    component.focus = false;
    if(componentType === documentConst.FIELDINPUT || documentConst.DROPDOWN){
      component.fieldKey = componentType + this.getUniqueId();
    }
    return component;
  }
  //Default initialize start
  initializeDoc() {
    let doc = new document();
    doc.id = 0;
    doc.name = 'first doc';
    doc.description = 'new description';
    doc.height = 100;
    doc.width = 100;
    doc.marginTop = 2;
    doc.marginLeft = 2;
    doc.createdOn = new Date();
    doc.createdBy = 'System';
    doc.modifiedOn = new Date();
    doc.modifiedBy = 'System';
    return doc;
  }

  initializeRow() {
    let rowObj = new row();
    rowObj.documentId = 0;
    rowObj.id = 1;
    // rowObj.createdOn = new Date();
    // rowObj.createdBy = 'system';
    // rowObj.modifiedOn = new Date();
    // rowObj.modifiedBy = 'Sysetm';
    rowObj.backgroundColor = 'Black';
    rowObj.opacity = 1;
    rowObj.height = 100;
    rowObj.width = 100;
    // rowObj.marginTop = 2;
    // rowObj.marginLeft = 2;
    rowObj.backgroundImageLink = 'link';
    rowObj.backgroundImageSize = 2;
    rowObj.backgroundImagePosition = 'top';
    rowObj.backgroundImageRepeat = 'yes';
    rowObj.backgroundImageOpacity = 1;
    return rowObj;
  }

  //Default initialize end

  buildDocumentFormGroup(doc: document = null) {
    let documentForm: FormGroup;
    if (doc) {
      documentForm = this.fb.group({
        id: [doc.id],
        name: [doc.name],
        description: [doc.description],
        height: [doc.height],
        width: [doc.width],
        marginTop: [doc.marginTop],
        marginLeft: [doc.marginLeft],
        createdOn: [doc.createdOn],
        createdBy: [doc.createdBy],
        modifiedOn: [doc.modifiedOn],
        modifiedBy: [doc.modifiedBy],
        rows: this.fb.array([])
      });
      doc.rows.forEach((item) => {
        (documentForm.get(documentConst.ROWS) as FormArray).push(
          this.buildRowFormGroup(item)
        );
      });
    } else {
      documentForm = this.fb.group({
        id: [null],
        name: [null],
        description: [null],
        height: [null],
        width: [null],
        marginTop: [null],
        marginLeft: [null],
        createdOn: [null],
        createdBy: [null],
        modifiedOn: [null],
        modifiedBy: [null],
        rows: this.fb.array([])
      });
      (documentForm.get(documentConst.ROWS) as FormArray).push(this.buildRowFormGroup(null));
    }
    return documentForm;
  }

  buildRowFormGroup(rowObj: row = null) {
    let obj: FormGroup;
    if (rowObj) {
      obj = this.fb.group({
        documentId: [rowObj.documentId],
        id: [rowObj.id],
        // createdOn: [rowObj.createdOn],
        // createdBy: [rowObj.createdBy],
        // modifiedOn: [rowObj.modifiedOn],
        // modifiedBy: [rowObj.modifiedBy],
        backgroundColor: [rowObj.backgroundColor],
        opacity: [rowObj.opacity],
        height: [rowObj.height],
        width: [rowObj.width],
        // marginTop: [rowObj.marginTop],
        // marginLeft: [rowObj.marginLeft],
        backgroundImageLink: [rowObj.backgroundImageLink],
        backgroundImageSize: [rowObj.backgroundImageSize],
        backgroundImagePosition: [rowObj.backgroundImagePosition],
        backgroundImageRepeat: [rowObj.backgroundImageRepeat],
        backgroundImageOpacity: [rowObj.backgroundImageOpacity],
        columns: this.fb.array([]),
      });
      rowObj.columns.forEach((item) => {
        (obj.get(documentConst.COLUMNS) as FormArray).push(this.buildColumnFormGroup(item));
      });
    } else {
      obj = this.fb.group({
        documentId: [null],
        id: [null],
        // createdOn: [null],
        // createdBy: [null],
        // modifiedOn: [null],
        // modifiedBy: [null],
        backgroundColor: [null],
        opacity: [null],
        height: [null],
        width: [null],
        // marginTop: [null],
        // marginLeft: [null],
        backgroundImageLink: [null],
        backgroundImageSize: [null],
        backgroundImagePosition: [null],
        backgroundImageRepeat: [null],
        backgroundImageOpacity: [null],
        columns: this.fb.array([]),
      });
    }
    return obj;
  }

  buildColumnFormGroup(columnObj: column = null) {
    if (columnObj) {
      let formControls = columnObj.dropdownList.map((obj: any) => {
        return this.fb.control(obj);
      });
      var componentForm = this.fb.group({
        rowId: [columnObj.rowId],
        id: [columnObj.id],
        type: [columnObj.type],
        icon: [columnObj.icon],
        height: [columnObj.height],
        width: [columnObj.width],
        // marginTop: [columnObj.marginTop],
        // marginLeft: [columnObj.marginLeft],
        // marginRight: [columnObj.marginRight],
        // marginBottom: [columnObj.marginBottom],
        // createdOn: [columnObj.createdOn],
        // createdBy: [columnObj.createdBy],
        // modifiedOn: [columnObj.modifiedOn],
        // modifiedBy: [columnObj.modifiedBy],
        style: [columnObj.style],
        class: [columnObj.class],
        isDeleted: [columnObj.isDeleted],
        focus: [columnObj.focus],
        imageSrc: [columnObj.imageSrc],
        videoUrl: [columnObj.videoUrl],
        selectedValidation: [columnObj.selectedValidation],
        dropdownItem: [columnObj.dropdownItem],
        dropdownList: this.fb.array(formControls),
        selectedDateFormat: [columnObj.selectedDateFormat],
        dateLimit: [columnObj.dateLimit],
        minDate: [columnObj.minDate],
        maxDate: [columnObj.maxDate],
        childValidation: [columnObj.childValidation],
        tableColumns: columnObj.tableColumns
          ? this.fb.array(columnObj.tableColumns.map((x) => new FormControl(x)))
          : this.fb.array([new FormControl(), new FormControl()]),
        tableRows: columnObj.tableRows
          ? this.fb.array(columnObj.tableRows.map((fg) => this.fb.group(fg)))
          : this.fb.array([this.fb.group({ 0: new FormControl(''), 1: new FormControl('') })]),
        pricingTableRows: this.fb.array([]),
        pricingTableColumns: this.fb.array(columnObj.pricingTableColumns.map((m) => new FormControl(m))),
        aggreateTable: this.fb.group({}),
        fieldKey : [columnObj.fieldKey],
        fieldName: [columnObj.fieldName],
        defaultValue : [columnObj.defaultValue],
        placeHolder: [columnObj.placeHolder],
      });

      if (columnObj.isPriceTable) {
        var pricingTableColumns = (componentForm.get('pricingTableColumns') as FormArray).controls;
        if (!columnObj.pricingTableRows || columnObj.pricingTableRows.length == 0) {
          const group: any = {};
          pricingTableColumns.forEach(column => {
            group[column.value.fieldCode] = this.fb.control('');
          });
          (componentForm.get('pricingTableRows') as FormArray).push(new FormGroup(group));

        } else {

          columnObj.pricingTableRows.forEach(value => {
            const group: any = {};
            pricingTableColumns.forEach(column => {
              group[column.value.fieldCode] = this.fb.control(value[column.value.fieldCode] || '');
            });
            (componentForm.get('pricingTableRows') as FormArray).push(new FormGroup(group));
          });
        }
        columnObj.aggreateTable.forEach(item=>{
          (componentForm.get('aggreateTable') as FormGroup).addControl(item.fieldCode, this.fb.control([item.fieldCode] || ''));
        });
      }
      return componentForm;
    } else {
      return this.fb.group({
        rowId: [null],
        id: [null],
        type: [null],
        icon: [null],
        height: [null],
        width: [null],
        // marginTop: [null],
        // marginLeft: [null],
        // marginRight: [null],
        // marginBottom: [null],
        // createdOn: [null],
        // createdBy: [null],
        // modifiedOn: [null],
        // modifiedBy: [null],
        style: [null],
        class: [null],
        isDeleted: [null],
        focus: [null],
        imageSrc: [null],
        videoUrl: [null],
        placeHolder: [null],
        selectedValidation: [null],
        tableRows: this.fb.array([]),
        tableColumns: this.fb.array([]),
        dropdownItem: [null],
        dropdownList: this.fb.array([]),
        selectedDateFormat: [null],
        dateLimit: [null],
        minDate: [null],
        maxDate: [null],
        childValidation: [null],
        pricingTableRows: this.fb.array([]),
        pricingTableColumns: this.fb.array([]),
        fieldKey : [null],
        fieldName: [null],
        defaultValue : [null],
      });
    }
  }
  buildDocumentMakerFormGroup(documentObj : documentMaker = null){
    let obj: FormGroup;
    if (documentObj) {
      obj = this.fb.group({
        id: [documentObj.id],
        name: [documentObj.name, [Validators.required]],
        description: [documentObj.description],
        moduleId: [documentObj.moduleId],
        subModuleId: [documentObj.subModuleId],
        HtmlContentTemplate: [documentObj.HtmlContentTemplate],
        fileTypeExtension: [documentObj.fileTypeExtension],
        json: [documentObj.json],
        url: [documentObj.url],
        EmbedImage: this.fb.array([])
      });
    } else {
      obj = this.fb.group({
        id: [null],
        name: [null, [Validators.required]],
        description: [null],
        moduleId: [null],
        subModuleId: [null],
        HtmlContentTemplate: [null],
        fileTypeExtension: [null],
        json: [null],
        url: [null],
         docMakerUpdate: ['docMakerUpdate'],
        docMakerNew: ['docMakerNew'],
        statusId: [{ value: 1001, text: 'Active' }, [Validators.required]],
        EmbedImage: this.fb.array([])
      });
    }
    return obj;
  }
}
