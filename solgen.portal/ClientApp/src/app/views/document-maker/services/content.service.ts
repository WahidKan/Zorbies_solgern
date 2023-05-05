import { EventEmitter, Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import {
  AvailableDatesConst,
  DateFormatConst,
  documentConst,
  validationConst,
} from "../../shared/constants/document-const";
import { AngularEditorConfig } from "../../shared/thirdParty/lib/config";
import { ContentItem } from "../dto/content";
import { componentBase, document, page } from "../dto/document-creation";

@Injectable({
  providedIn: "root",
})
export class ContentService {
  onPageAdd: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {}
  private blocks: ContentItem[] = [
    new ContentItem(
      documentConst.BLOCKINPUT,
      "Text",
      800,
      "fa fa-text-width",
      "1",
      "class list"
    ),
    new ContentItem(
      documentConst.IMG,
      "Image",
      800,
      "fa fa-picture-o",
      "1",
      "class list"
    ),
    new ContentItem(
      documentConst.VIDEO,
      "Video",
      800,
      "fa fa-video-camera",
      "1",
      "class list"
    ),
    new ContentItem(
      documentConst.TABLE,
      "Table",
      800,
      "fa fa-table",
      "1",
      "class list"
    ),
    new ContentItem(
      documentConst.PRICINGTABLE,
      "Pricing Table",
      800,
      "fa fa-th",
      "1",
      "class list"
    ),
    new ContentItem(
      documentConst.TABLEOFCONTENT,
      "Table of contents",
      800,
      "fa fa-th-large",
      "1",
      "class list"
    ),
    new ContentItem(
      documentConst.BR,
      "Page Break",
      800,
      "fa fa-scissors",
      "1",
      "class list"
    ),
  ];

  private fields: ContentItem[] = [
    new ContentItem(
      documentConst.FIELDINPUT,
      "Text Feild",
      800,
      "fa fa-font",
      "1",
      "class list"
    ),
    new ContentItem(
      documentConst.SIGNATURE,
      "Signature",
      800,
      "fa fa-sign-language",
      "1",
      "class list"
    ),
    new ContentItem(
      documentConst.INITIALS,
      "Initials",
      800,
      "fa fa-h-square",
      "1",
      "class list"
    ),
    new ContentItem(
      documentConst.DATE,
      "Date",
      800,
      "fa fa-calendar",
      "1",
      "class list"
    ),
    new ContentItem(
      documentConst.CHECKBOX,
      "Checkbox",
      800,
      "feather-check-square",
      "1",
      "class list"
    ),
    new ContentItem(
      documentConst.DROPDOWN,
      "Dropdown",
      800,
      "fa fa-caret-square-o-down",
      "1",
      "class list"
    ),
    new ContentItem(
      documentConst.CARD,
      "Card details",
      800,
      "fa fa-address-card-o",
      "1",
      "class list"
    ),
    new ContentItem(
      documentConst.FILE,
      "Collect files",
      800,
      "fa fa-upload",
      "1",
      "class list"
    ),
  ];
  private droppedControl = new Subject<ContentItem>();
  private duplicateControl = new Subject<componentBase>();
  private deleteControl = new Subject<componentBase>();
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
  setDuplicateControl(control: componentBase) {
    this.duplicateControl.next(control);
  }

  getDuplicateControl() {
    return this.duplicateControl.asObservable();
  }
  // duplicate controls end

  // delete controls start
  raiseDeleteEvent(control: componentBase) {
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
  generateComponentDto(
    componentType,
    event,
    positionX,
    positionY,
    positionBottom,
    positionRight,
    pageIndex
  ) {
    let component = new componentBase();
    if (componentType === documentConst.FIELDINPUT) {
      component.width = 200;
      component.height = 40;
      component.placeHolder = "Enter Value";
      component.selectedValidation = validationConst.NONE;
      component.marginLeft = event.clientX - positionX;
    } else if (componentType === documentConst.CHECKBOX) {
      component.width = 170;
      component.height = 40;
      component.marginLeft = event.clientX - positionX;
    } else if (componentType === documentConst.DATE) {
      component.placeHolder = "Select date";
      component.selectedDateFormat = DateFormatConst.YYYY_WITH_DASH;
      component.dateLimit = AvailableDatesConst.ANY_DATES;
      component.marginLeft = event.clientX - positionX;
    } else if (componentType === documentConst.DROPDOWN) {
      component.width = 170;
      component.height = 70;
      component.placeHolder = "Please select...";
      component.marginLeft = event.clientX - positionX;
    } else if (componentType === documentConst.PRICINGTABLE) {
      component.isPriceTable = true;
      component.pricingTableColumns = [
        { header: "Name", type: "text", disabled: false, fieldCode: "name" },
        {
          header: "Price",
          type: "number",
          disabled: false,
          fieldCode: "price",
        },
        {
          header: "Quantity",
          type: "number",
          disabled: false,
          fieldCode: "quantity",
        },
        {
          header: "Sub total",
          type: "number",
          disabled: true,
          fieldCode: "subTotal",
          calcluateValue: ["quantity", "price"],
        },
      ];
      for (let index = 0; index < 3; index++) {
        let obj: any = {};
        component.pricingTableColumns.forEach((column) => {
          obj[column.fieldCode] = "";
        });
        component.pricingTableRows.push(obj);
      }
      component.aggreateTable = [
        {
          header: "Sub Total",
          type: "number",
          fieldCode: "subTotal",
          isMapped: true,
        },
        {
          header: "Discount",
          type: "number",
          fieldCode: "discount",
          isMapped: false,
        },
        { header: "Tax", type: "number", fieldCode: "tax", isMapped: false },
        {
          header: "Total",
          type: "number",
          fieldCode: "total",
          isMapped: false,
        },
      ];
    } else {
      component.width = positionRight - positionX - 40;
      component.height = 70;
      component.marginLeft = 20;
    }
    component.type = componentType;
    component.marginTop = event.layerY;

    // if (pageIndex == 0) {
    //   component.marginTop = event.clientY - positionY;
    // } else if (pageIndex == 1) {
    //   component.marginTop = event.clientY - positionBottom;
    // } else {
    //   component.marginTop = event.layerY;
    // }
    component.id = this.getUniqueId();
    component.pageId = pageIndex;
    component.marginRight = positionRight;
    component.marginBottom = event.clientY - positionBottom;
    component.focus = false;
    component.isPreview = false;
    return component;
  }

  //Default initialize start
  initializeDoc() {
    let doc = new document();
    doc.id = 0;
    doc.name = "first doc";
    doc.description = "new description";
    doc.height = 100;
    doc.width = 100;
    doc.marginTop = 2;
    doc.marginLeft = 2;
    doc.createdOn = new Date();
    doc.createdBy = "System";
    doc.modifiedOn = new Date();
    doc.modifiedBy = "System";
    doc.numberOfPages = 2;
    doc.pages.push(this.initializePage());
    return doc;
  }

  initializePage() {
    let pageObj = new page();
    pageObj.documentId = 0;
    pageObj.id = Math.random();
    pageObj.createdOn = new Date();
    pageObj.createdBy = "system";
    pageObj.modifiedOn = new Date();
    pageObj.modifiedBy = "Sysetm";
    pageObj.backgroundColor = "Black";
    pageObj.opacity = 1;
    pageObj.height = 100;
    pageObj.width = 100;
    pageObj.marginTop = 2;
    pageObj.marginLeft = 2;
    pageObj.marginBottom = 15;
    pageObj.backgroundImageLink = "link";
    pageObj.backgroundImageSize = 2;
    pageObj.backgroundImagePosition = "top";
    pageObj.backgroundImageRepeat = "yes";
    pageObj.backgroundImageOpacity = 1;
    return pageObj;
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
        numberOfPages: [doc.numberOfPages],

        pages: this.fb.array([]),
      });
      doc.pages.forEach((item) => {
        (documentForm.get(documentConst.PAGES) as FormArray).push(
          this.buildPageFormGroup(item)
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
        numberOfPages: [null],
        pages: this.fb.array([]),
      });
      (documentForm.get(documentConst.PAGES) as FormArray).push(
        this.buildPageFormGroup(null)
      );
    }
    return documentForm;
  }

  buildPageFormGroup(pageObj: page = null) {
    let obj: FormGroup;
    if (pageObj) {
      obj = this.fb.group({
        documentId: [pageObj.documentId],
        id: [pageObj.id],
        createdOn: [pageObj.createdOn],
        createdBy: [pageObj.createdBy],
        modifiedOn: [pageObj.modifiedOn],
        modifiedBy: [pageObj.modifiedBy],
        backgroundColor: [pageObj.backgroundColor],
        opacity: [pageObj.opacity],
        height: [pageObj.height],
        width: [pageObj.width],
        marginTop: [pageObj.marginTop],
        marginLeft: [pageObj.marginLeft],
        backgroundImageLink: [pageObj.backgroundImageLink],
        backgroundImageSize: [pageObj.backgroundImageSize],
        backgroundImagePosition: [pageObj.backgroundImagePosition],
        backgroundImageRepeat: [pageObj.backgroundImageRepeat],
        backgroundImageOpacity: [pageObj.backgroundImageOpacity],
        components: this.fb.array([]),
      });
      pageObj.components.forEach((item) => {
        (obj.get(documentConst.COMPONENTS) as FormArray).push(
          this.buildComponentFormGroup(item)
        );
      });
    } else {
      obj = this.fb.group({
        documentId: [null],
        id: [null],
        createdOn: [null],
        createdBy: [null],
        modifiedOn: [null],
        modifiedBy: [null],
        backgroundColor: [null],
        opacity: [null],
        height: [null],
        width: [null],
        marginTop: [null],
        marginLeft: [null],
        backgroundImageLink: [null],
        backgroundImageSize: [null],
        backgroundImagePosition: [null],
        backgroundImageRepeat: [null],
        backgroundImageOpacity: [null],
        components: this.fb.array([]),
      });
    }
    return obj;
  }

  buildComponentFormGroup(componentObj: componentBase = null) {
    if (componentObj) {
      let formControls = componentObj.dropdownList.map((obj: any) => {
        return this.fb.control(obj);
      });
      var componentForm = this.fb.group({
        pageId: [componentObj.pageId],
        id: [componentObj.id],
        displayName: [componentObj.displayName],
        type: [componentObj.type],
        icon: [componentObj.icon],
        height: [componentObj.height],
        width: [componentObj.width],
        marginTop: [componentObj.marginTop],
        marginLeft: [componentObj.marginLeft],
        marginRight: [componentObj.marginRight],
        marginBottom: [componentObj.marginBottom],
        createdOn: [componentObj.createdOn],
        createdBy: [componentObj.createdBy],
        modifiedOn: [componentObj.modifiedOn],
        modifiedBy: [componentObj.modifiedBy],
        style: [componentObj.style],
        class: [componentObj.class],
        isDeleted: [componentObj.isDeleted],
        focus: [componentObj.focus],
        imageSrc: [componentObj.imageSrc],
        videoUrl: [componentObj.videoUrl],
        placeHolder: [componentObj.placeHolder],
        selectedValidation: [componentObj.selectedValidation],
        dropdownItem: [componentObj.dropdownItem],
        dropdownList: this.fb.array(formControls),
        selectedDateFormat: [componentObj.selectedDateFormat],
        dateLimit: [componentObj.dateLimit],
        minDate: [componentObj.minDate],
        maxDate: [componentObj.maxDate],
        childValidation: [componentObj.childValidation],
        tableColumns: componentObj.tableColumns
          ? this.fb.array(
              componentObj.tableColumns.map((x) => new FormControl(x))
            )
          : this.fb.array([new FormControl(), new FormControl()]),
        tableRows: componentObj.tableRows
          ? this.fb.array(componentObj.tableRows.map((fg) => this.fb.group(fg)))
          : this.fb.array([
              this.fb.group({ 0: new FormControl(""), 1: new FormControl("") }),
            ]),
        pricingTableRows: this.fb.array([]),
        pricingTableColumns: this.fb.array(
          componentObj.pricingTableColumns.map((m) => new FormControl(m))
        ),
        aggreateTable: this.fb.group({}),
        isPreview: [componentObj.isPreview],
      });

      if (componentObj.isPriceTable) {
        var pricingTableColumns = (
          componentForm.get("pricingTableColumns") as FormArray
        ).controls;
        if (
          !componentObj.pricingTableRows ||
          componentObj.pricingTableRows.length == 0
        ) {
          const group: any = {};
          pricingTableColumns.forEach((column) => {
            group[column.value.fieldCode] = this.fb.control("");
          });
          (componentForm.get("pricingTableRows") as FormArray).push(
            new FormGroup(group)
          );
        } else {
          componentObj.pricingTableRows.forEach((value) => {
            const group: any = {};
            pricingTableColumns.forEach((column) => {
              group[column.value.fieldCode] = this.fb.control(
                value[column.value.fieldCode] || ""
              );
            });
            (componentForm.get("pricingTableRows") as FormArray).push(
              new FormGroup(group)
            );
          });
        }
        componentObj.aggreateTable.forEach((item) => {
          (componentForm.get("aggreateTable") as FormGroup).addControl(
            item.fieldCode,
            this.fb.control([item.fieldCode] || "")
          );
        });
      }
      return componentForm;
    } else {
      return this.fb.group({
        pageId: [null],
        id: [null],
        displayName: [null],
        type: [null],
        icon: [null],
        height: [null],
        width: [null],
        marginTop: [null],
        marginLeft: [null],
        marginRight: [null],
        marginBottom: [null],
        createdOn: [null],
        createdBy: [null],
        modifiedOn: [null],
        modifiedBy: [null],
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
        isPreview: [null],
      });
    }
  }
}
