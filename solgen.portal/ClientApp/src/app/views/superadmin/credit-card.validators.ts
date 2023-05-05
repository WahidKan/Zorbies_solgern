import { AbstractControl, ValidationErrors } from "@angular/forms";

export const CreditCardValidator = function (control: AbstractControl): ValidationErrors | null {

  let value: string = control.value || '';

  if (!value) {
    return null
  }


  let specialCharacters = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
  if (specialCharacters.test(value) === false) {
    return {creditcardPattern: true };
  }
  return null;
}