import { FormGroup } from '@angular/forms'

export function markAsTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched()

    const childGroup = control as FormGroup
    if (childGroup.controls) {
      markAsTouched(childGroup)
    }
  })
}
