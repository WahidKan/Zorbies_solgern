import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ContentService } from 'src/app/views/document-maker/services/content.service';
import { AvailableDatesConst, DateFormatConst, styleConst, validationConst } from '../../constants/document-const';

@Component({
  selector: 'app-advanced-properties-modal',
  templateUrl: './advanced-properties-modal.component.html',
  styleUrls: ['./advanced-properties-modal.component.scss']
})
export class AdvancedPropertiesModalComponent implements OnInit {

  @Input('control') control: FormGroup;
  @ViewChild('modal', { static: false }) advancedSettingsModal: ModalDirective;
  cssModel: FormGroup;
  cssSubscription: any;
  textFieldValidationList: any = [];
  dateFormatsList: any = [];
  dateLimitList: any = [];
  childValidationList: any = [];
  constructor(private fb: FormBuilder, private contentService: ContentService) { }

  ngOnInit() {
    this.textFieldValidationList.push(
      {key: validationConst.NONE, value: "None"},
      {key: validationConst.EMAIL_ADDRESS, value: "Email address"},
      {key: validationConst.PHONE_NUMBER, value: "Phone number"},
      {key: validationConst.ZIP_CODE, value: "ZIP Code"},
      {key: validationConst.SOCIAL_SECURITY_NUMBER, value: "Social Security number"},
      {key: validationConst.NUMBERS_ONLY, value: "Numbers only"},
      {key: validationConst.LETTERS_ONLY, value: "Letters only"});

    this.dateFormatsList.push(
      {key: DateFormatConst.YYYY_WITH_DASH, value: "YYYY-MM-DD"},
      {key: DateFormatConst.MM_WITH_DASH, value: "MM-DD-YYYY"},
      {key: DateFormatConst.DD_WITH_DASH, value: "DD-MM-YYYY"},
      {key: DateFormatConst.YYYY_WITH_SLASH, value: "YYYY / MM / DD"},
      {key: DateFormatConst.MM_WITH_SLASH, value: "MM / DD / YYYY"},
      {key: DateFormatConst.DD_WITH_SLASH, value: "DD / MM / YYYY"},
      {key: DateFormatConst.YYYY_WITH_DOT, value: "YYYY.MM.DD"},
      {key: DateFormatConst.MM_WITH_DOT, value: "MM.DD.YYYY"},
      {key: DateFormatConst.DD_WITH_DOT, value: "DD.MM.YYYY"},
      {key: DateFormatConst.MM_WITH_COMMA, value: "MMM DD, YYYY"},
      {key: DateFormatConst.DD_SIMPLE, value: "DD MMM YYYY"});

    this.dateLimitList.push(
      {key: AvailableDatesConst.ANY_DATES, value: "Any Dates"},
      {key: AvailableDatesConst.PAST_DATES, value: "Past Dates"},
      {key: AvailableDatesConst.FUTURE_DATES, value: "Future Dates"});

    this.childValidationList.push(
      {parentLocation: validationConst.PHONE_NUMBER, key: validationConst.PHONE_NUMBER_US_FORMAT, value: 'US Format (Phone)', disabled: true},
      {parentLocation: validationConst.PHONE_NUMBER, key: validationConst.PHONE_NUMBER_INTERNATIONAL_FORMAT, value: 'International Format (Phone)', disabled: true},
      {parentLocation: validationConst.ZIP_CODE, key: validationConst.ZIP_CODE_US, value: 'US ZIP', disabled: true},
      {parentLocation: validationConst.ZIP_CODE, key: validationConst.ZIP_CODE_US_4, value: 'US ZIP+4', disabled: true});
    this.editCss(null);

  }
  editCss(control: any) {
    if (control) {
      this.removePixel(control);
      this.cssModel = this.fb.group({
        'margin-left': [control[styleConst.MARGIN_LEFT]],
        'margin-right': [control[styleConst.MARGIN_RIGHT]],
        'margin-top': [control[styleConst.MARGIN_TOP]],
        'margin-bottom': [control[styleConst.MARGIN_BOTTOM]],
        'padding-left': [control[styleConst.PADDING_LEFT]],
        'padding-right': [control[styleConst.PADDING_RIGHT]],
        'padding-top': [control[styleConst.PADDING_TOP]],
        'padding-bottom': [control[styleConst.PADDING_BOTTOM]],
        'background-color': [control[styleConst.BACKGROUND_COLOR]]
      });
    }
    else {
      this.cssModel = this.fb.group({
        'margin-left': [0],
        'margin-right': [0],
        'margin-top': [0],
        'margin-bottom': [0],
        'padding-left': [0],
        'padding-right': [0],
        'padding-top': [0],
        'padding-bottom': [0],
        'background-color': [null]
      });
    }
  }

  showPopup(control: FormGroup) {
    this.control = control;
    this.editCss(this.control.get('style').value);
    this.advancedSettingsModal.show();
    this.cssSubscription = this.cssModel.valueChanges.subscribe(control => {
      this.addPixel(control);
      this.control.get('style').setValue(control);
    });
  }
  close() {
    this.cssSubscription.unsubscribe();
    this.advancedSettingsModal.hide();
  }
  addPixel(control: any) {
    for (const item in control) {
      if (control[item] && !isNaN(control[item])) {
        control[item] = control[item] + 'px';
      }
    }
  }
  removePixel(control: any) {
    for (const item in control) {
      if (isNaN(control[item]) && control[item].includes('px'))
        control[item] = control[item].replace('px', '');
    }
  }
  updatePlaceHolder() {
    const validationSelectedValue = this.control.get('selectedValidation').value;
    if (validationSelectedValue === validationConst.NONE || validationSelectedValue === validationConst.NUMBERS_ONLY || validationSelectedValue === validationConst.LETTERS_ONLY) {
      this.control.get('placeHolder').setValue("Enter Value");
    }
    else if (validationSelectedValue === validationConst.EMAIL_ADDRESS) {
      this.control.get('placeHolder').setValue("your@email.com");
    }
    else if (validationSelectedValue === validationConst.PHONE_NUMBER) {
      this.control.get('placeHolder').setValue("(123) 456-7890");
      this.childValidationList.forEach(item => {
        if(item.parentLocation === validationConst.PHONE_NUMBER){
          item.disabled = false;
        }
        else{
          item.disabled = true;
        }
      });
      this.control.get('childValidation').setValue(validationConst.PHONE_NUMBER_US_FORMAT);
    }
    else if (validationSelectedValue === validationConst.ZIP_CODE) {
      this.control.get('placeHolder').setValue("12345");
      this.childValidationList.forEach(item => {
        if(item.parentLocation === validationConst.ZIP_CODE){
          item.disabled = false;
        }
        else{
          item.disabled = true;
        }
      });
      this.control.get('childValidation').setValue(validationConst.ZIP_CODE_US);
   }
    else if (validationSelectedValue === validationConst.SOCIAL_SECURITY_NUMBER) {
      this.control.get('placeHolder').setValue("123-45-6789");
    }
    this.childValidationList = [...this.childValidationList];
    if(validationSelectedValue !== validationConst.NONE){
      this.contentService.setValidationEvent();
    }
  }
  addItem() {
    if (this.control.get('dropdownItem') && this.control.get('dropdownItem').value) {
      const obj = { key: this.control.get('dropdownItem').value, text: this.control.get('dropdownItem').value };
      (this.control.get('dropdownList') as FormArray).push(this.fb.control(obj));
      this.control.get('dropdownItem').setValue(null);
    }
  }
  removeItem(index: number) {
    (this.control.get('dropdownList') as FormArray).removeAt(index);
  }

  get dropdownList() {
    return this.control.get('dropdownList') as FormArray;
  }
  updateDateFormat() {
    this.contentService.setDateFormatEvent();
  }
  updateDateLimit() {
    this.contentService.setDateLimitEvent();
  }

  updateValidation() {
    const validationSelectedValue = this.control.get('childValidation').value;
    if (validationSelectedValue === validationConst.PHONE_NUMBER_US_FORMAT) {
      this.control.get('placeHolder').setValue("(123) 456-7890");
    }
    else if (validationSelectedValue === validationConst.PHONE_NUMBER_INTERNATIONAL_FORMAT) {
      this.control.get('placeHolder').setValue("+1 (123) 456-7890");
    }
    else if (validationSelectedValue === validationConst.ZIP_CODE_US) {
      this.control.get('placeHolder').setValue("12345");
    }
    else if (validationSelectedValue === validationConst.ZIP_CODE_US_4) {
      this.control.get('placeHolder').setValue("12345-6789");
    }
    this.contentService.setValidationEvent();
  }
}
