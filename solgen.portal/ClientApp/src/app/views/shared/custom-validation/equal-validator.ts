import { ValidatorFn,FormGroup } from '@angular/forms';
import { retry } from 'rxjs/operators';

export class EqualValidator {
  static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        group.controls[confirmPasswordKey].setErrors({ mismatched: true });
      } else {
        return null;
      }
    };
  }
  static ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
  static percentage(ownerShipKey: string): ValidatorFn {

    return (group: FormGroup): { [key: string]: any } => {
      const ownerShip = group.controls[ownerShipKey];
      if (ownerShip.value && (isNaN(ownerShip.value) && ownerShip.value != ' ')) {
        group.controls[ownerShipKey].setErrors({ notValid: true });
      }

      else if (ownerShip.value && (ownerShip.value < 0 || ownerShip.value > 100)) {
        group.controls[ownerShipKey].setErrors({ notValid: true });
      }

      else if (ownerShip.value && (ownerShip.value > 0 || ownerShip.value < 100)) {
        let val = ownerShip.value.toString().split('.');
        if (val.length > 1) {
          if (val[1].length <= 0) {
            group.controls[ownerShipKey].setErrors({ notValid: true });
          }
          else {
            return null;
          }
        }
        else {
          return null;
        }
      } else {
        return null;
      }
    };
  }
}

