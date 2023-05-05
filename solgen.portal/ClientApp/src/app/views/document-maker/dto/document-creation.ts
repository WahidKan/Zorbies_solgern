import { FormArray, FormControl } from "@angular/forms";
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
  numberOfPages: number;
  pages: page[] = [];
}

export class page {
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
  marginBottom: number;
  backgroundImageLink: string;
  backgroundImageSize: number;
  backgroundImagePosition: string;
  backgroundImageRepeat: string;
  backgroundImageOpacity: number;
  components: componentBase[] = [];
}
export class componentBase {
  constructor() {}
  pageId: number;
  id: string;
  displayName: string;
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
  aggreateTable: any[] = []; //For pricing table component
  isPreview: boolean; //For preview purpose
}
export class textComponent extends componentBase {
  constructor() {
    super();
    this.basicProperties = [
      new property("background-color", "black", "Background Color"),
      new property("background", "black", "Background"),
    ];
    this.advanceProperties = [
      new property("margin", "0px", "Margin"),
      new property("padding", "0px", "Padding"),
    ];
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
