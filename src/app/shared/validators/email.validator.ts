import { FormControl } from '@angular/forms';

export function EmailValidator(control: FormControl) {
  const email = control.value;
  
  if (!email || email.indexOf('@') === -1) {
    return { invalidEmail: true };
  }

  return null;
}
