import { FormArray, FormControl } from '@angular/forms';
export class document {
  id: number;
  name: string;
  description: string;
  height: number;
  width: number;
  marginTop: number;
  marginLeft: number;
  createdOn: Date;
  createdBy: string;
  modifiedOn: Date;
  modifiedBy: string;
  rows: row[] = [];
  placeHolders: placeHolder[] = [];
}

export class row {
  documentId: number;
  id: number;
  createdOn: Date;
  createdBy: string;
  modifiedOn: Date;
  modifiedBy: string;
  backgroundColor: string;
  opacity: number;
  height: number;
  width: number;
  marginTop: number;
  marginLeft: number;
  backgroundImageLink: string;
  backgroundImageSize: number;
  backgroundImagePosition: string;
  backgroundImageRepeat: string;
  backgroundImageOpacity: number;
  columns: column[] = [];
}
export class column {
  constructor() { }
  rowId: number;
  id: string;
  type: string;
  icon: string;
  height: number;
  width: number;
  marginTop: number;
  marginLeft: number;
  marginRight: number;
  marginBottom: number;
  createdOn: Date;
  createdBy: string;
  modifiedOn: Date;
  modifiedBy: string;
  style: string;
  class: string;
  isDeleted: boolean;
  focus: boolean;
  tableRows: []; //For table component
  tableColumns: []; //For table component
  imageSrc: any; //For image component
  videoUrl: string; //For video component
  placeHolder: string; //For text field, date component
  selectedValidation: string; //For text field component
  selectedDateFormat: any; //For date component
  dropdownItem: any; //For dropdown component
  dropdownList: any = []; //For dropdown component
  dateLimit: string; //For date component
  minDate: Date; //For date component
  maxDate: Date; //For date component
  childValidation: string; //For text field component
  pricingTableRows: any[] = []; //For pricing table component
  pricingTableColumns: any[] = []; //For pricing table component
  isPriceTable: boolean; //For pricing table component
  aggreateTable: any[] =[]; //For pricing table component;
  fieldKey: string;
  fieldName: string;
  defaultValue: string;
}
export class placeHolder{
  type: string;
  fieldKey: string;
  fieldName: string;
  defaultValue: string;
  dropdownList: any = [];
}
export class documentMaker{
  id: string;
  name: string;
  description: string;
  fileTypeExtension: string;
  subModuleId: number;
  HtmlContentTemplate: number;
  moduleId: number;
  statusId: number;
  json: string;
  url: string;
  numberOfPages: number;
  embdedImage: any = [];
}

export class documentFieldsList{
  DocumentId: number;
  FieldKey: string;
  FieldName: string;
  FieldType: string;
  FieldValue : string;
  IsImage: number;
  PageNumber: number;
  Width: number;
  height: number;
  left: number;
  top: number;
  statusId: number;
  PlaceHolderId: number;

}
export class textComponent extends column {
  constructor() {
    super();
    this.basicProperties = [new property('background-color', 'black', 'Background Color'), new property('background', 'black', 'Background')];
    this.advanceProperties = [new property('margin', '0px', 'Margin'), new property('padding', '0px', 'Padding')];
  }
  basicProperties: property[];
  advanceProperties: property[];
}
export class property {
  constructor(key, value, displayName) {
    this.key = key;
    this.value = value;
    this.displayName = displayName;
  }
  key: string;
  value: string;
  displayName: string;
}
