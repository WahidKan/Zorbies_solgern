import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContentService } from 'src/app/views/document-maker/services/content.service';
import { validationConst } from '../../constants/document-const';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit, OnDestroy {
  @Input('textField') public textField: FormGroup;
  focus: boolean = false;
  validate: boolean = false;
  tooltipText: string = "";
  customTooltip: boolean = false;
  validationSubscription: any;
  constructor(private contentService: ContentService) { }
  ngOnInit() {
    this.validationSubscription = this.contentService.getValidationEvent().subscribe(() => {
      this.validation();
    });
    if (this.textField.get('focus').value) {
      this.focus = true;
      this.textField.get('focus').setValue(false);
    }
  }

  validateInput(validationType: string, value: any, childValidationType: string) {
    let regularExpression: RegExp;
    if (validationType === validationConst.EMAIL_ADDRESS) {
      regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    else if (validationType === validationConst.LETTERS_ONLY) {
      regularExpression = /^[a-z A-Z]+$/;
    }
    else if (validationType === validationConst.NUMBERS_ONLY) {
      regularExpression = /^[0-9]+$/;
    }
    else if(validationType === validationConst.SOCIAL_SECURITY_NUMBER){
      regularExpression = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
    }
    else if(validationType === validationConst.PHONE_NUMBER){
      if(childValidationType === validationConst.PHONE_NUMBER_US_FORMAT){
        regularExpression = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
      }
      else if(childValidationType === validationConst.PHONE_NUMBER_INTERNATIONAL_FORMAT){
        regularExpression = /^(\+|00)[1-9][0-9 \-\(\)]{7,}$/;
      }
    }
    else if(validationType === validationConst.ZIP_CODE){
      if(childValidationType === validationConst.ZIP_CODE_US){
        regularExpression = /^[0-9]{5}$/;
      }
      else if(childValidationType === validationConst.ZIP_CODE_US_4){
        regularExpression = /^[0-9]{5}(-[0-9]{4})$/;
      }
    }
    return regularExpression.test(String(value).toLowerCase());
  }
  validation() {
    const validationType = this.textField.get('selectedValidation').value;
    const childValidationType = this.textField.get('childValidation').value;
    const fieldValue = this.textField.get('displayName').value;
    if(validationType !== validationConst.NONE){
      this.validate = this.validateInput(validationType, fieldValue, childValidationType);
      if (!this.validate) {
        if (validationType === validationConst.EMAIL_ADDRESS) {
          this.tooltipText = "Email Address. e.g. Test@zorbis.net";
        }
        else if (validationType === validationConst.LETTERS_ONLY) {
          this.tooltipText = "Letters Only. e.g. Veera Swami";
        }
        else if (validationType === validationConst.NUMBERS_ONLY) {
          this.tooltipText = "Numbers Only. e.g. 123";
        }
        else if(validationType === validationConst.SOCIAL_SECURITY_NUMBER){
          this.tooltipText = "Social Security number. e.g. 123-45-6789";
        }
        else if(validationType === validationConst.PHONE_NUMBER){
          if(childValidationType === validationConst.PHONE_NUMBER_US_FORMAT){
            this.tooltipText = "US phone number. e.g. (123) 456-7890";
          }
          else if(childValidationType === validationConst.PHONE_NUMBER_INTERNATIONAL_FORMAT){
            this.tooltipText = "International phone number. e.g. +1 (123) 456-7890";
          }
        }
        else if(validationType === validationConst.ZIP_CODE){
          if(childValidationType === validationConst.ZIP_CODE_US){
            this.tooltipText = "US Zip code. e.g. 12345";
          }
          else if(childValidationType === validationConst.ZIP_CODE_US_4){
            this.tooltipText = "US Zip code + 4. e.g. 12345-6789";
          }
        }
        this.textField.get('style').setValue({ 'border': '3px solid red' });
        this.customTooltip = true;
      }
      else {
        this.tooltipText = this.textField.get('placeHolder').value;
        this.textField.get('style').setValue(null);
        this.customTooltip = false;
      }
    }
  }
  ngOnDestroy(): void {
    this.validationSubscription.unsubscribe();
  }

}
