import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    const isLengthValid = value && value.length >= 8;
    
    const containsLetter = /[a-zA-Z]/.test(value);
    const containsNumber = /\d/.test(value);
    const isCharacterValid = containsLetter && containsNumber;
    
    if (!isLengthValid) {
      return { 'passwordLength': true };
    }
    
    if (!isCharacterValid) {
      return { 'passwordCharacters': true };
    }
    
    return null;
  };
}
