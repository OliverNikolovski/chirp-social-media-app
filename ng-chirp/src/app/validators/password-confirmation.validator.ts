import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function PasswordConfirmationValidator(passwordControl: AbstractControl): ValidatorFn {
  return (confirmedPasswordControl: AbstractControl): ValidationErrors | null => {
    console.log('vlegov')
    return passwordControl.value === confirmedPasswordControl.value ? null : { passwordsDoNotMatch: true }
  };
}
