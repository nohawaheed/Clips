import { ValidationErrors, AbstractControl, ValidatorFn, AsyncValidator } from "@angular/forms";
import { Auth, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { inject, Injectable } from '@angular/core';

export function Match(controlName: string, matchingControlName: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    if (!control || !matchingControl) {
      console.error('form controls can not be found in the form group.')
      return { controlNotFound: false };
    }

    const error = control.value === matchingControl.value ? null : { noMatch: true };

    matchingControl.setErrors(error);

    return error;
  }
}

/* For this to work we need to Disabl email enumeration protection in firebase settings which is not recommended through
Authentication > Settings > User actions.Uncheck Email enumeration protection.

If we must check for email existence without attempting a login (e.g., for an admin panel), we should use the Firebase Admin SDK on your backend or in a Cloud Function.Method: getUserByEmail(email)
Behavior: This method returns a UserRecord if the user exists or throws a user-not-found error if they do not.
Safety: This bypasses client-side enumeration protection because it is performed in a trusted environment.*/
@Injectable({ providedIn: 'root' })
export class EmailTaken implements AsyncValidator {
  auth = inject(Auth);
  validate = async (control: AbstractControl): Promise<ValidationErrors | null> => {
    return await fetchSignInMethodsForEmail(this.auth, control.value).then(
      (response) => (response.length ? { emailTaken: true } : null)
    )
  }
}
