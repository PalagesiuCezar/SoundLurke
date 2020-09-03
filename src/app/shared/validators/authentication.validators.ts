import {FormGroup} from "@angular/forms";

// Check for validation between two fields.

export function MustMach(controlName: string, matchingControlName: string) {

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if(matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
    }

    if (control.value !== matchingControl.value){
      matchingControl.setErrors({ mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  }
}
