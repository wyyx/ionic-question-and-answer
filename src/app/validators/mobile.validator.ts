import { AbstractControl, ValidationErrors } from '@angular/forms'

export function mobileValidator(control: AbstractControl): ValidationErrors {
  const pattern = /^1[34578]\d{9}$/

  if (!control.value) {
    return null
  }

  return pattern.test(control.value)
    ? null
    : {
        mobile: '手机号码不合法'
      }
}
