import { ValidatorFn, AbstractControl } from "@angular/forms";


export class SolgenValidator {

  static numberExp = new RegExp('^[0-9]*$');
  

  static number(control: AbstractControl): { [key: string]: boolean } | null {
    if (typeof control !== 'undefined')
      if (!SolgenValidator.numberExp.test(control.value)) {
      return { 'number': true }
    }
  
    return null;
    //return SolgenValidator.inputValidator('blue')(control);
  }

  //static red(control: AbstractControl): { [key: string]: boolean } | null {
  //  return SolgenValidator.inputValidator('red')(control);
  //}

  //static white(control: AbstractControl): any | null {
  //  return SolgenValidator.inputValidator('white')(control);
  //}

  //static inputValidator(colorName: string): ValidatorFn {
  //  return (control: AbstractControl): { [key: string]: any } | null =>

  //    control.value?.toLowerCase() === colorName ? null : { wrongColor: control.value };
  //}

  static numberValidator(number): any {
    if (number.pristine) {
      return null;
    }
    const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;
    number.markAsTouched();

    if (NUMBER_REGEXP.test(number.value)) {
      return null;
    } return {
      invalidNumber: true
    };
  }

}
