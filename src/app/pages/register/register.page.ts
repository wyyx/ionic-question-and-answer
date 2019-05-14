import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NavController } from '@ionic/angular'
import { take } from 'rxjs/operators'
import { AuthService } from 'src/app/services/auth.service'
import { ConfigService } from 'src/app/services/config.service'
import { mobileValidator } from 'src/app/validators/mobile.validator'
import { markAsTouched } from 'src/app/utils/form.util'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  form: FormGroup
  mobileCtl: FormControl
  nicknameCtl: FormControl
  passwordCtl: FormControl
  repasswordCtl: FormControl
  passwordGroupCtl: FormGroup

  backText: string

  constructor(
    private configService: ConfigService,
    private navCtl: NavController,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.setupForm()
    this.backText = this.configService.backText
  }

  setupForm() {
    this.form = this.fb.group({
      mobile: ['', Validators.compose([Validators.required, mobileValidator])],
      nickname: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      passwordGroup: this.fb.group(
        {
          password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
          repassword: ['', Validators.required]
        },
        { validator: validatePasswordGroup }
      )
    })

    this.mobileCtl = this.form.get('mobile') as FormControl
    this.nicknameCtl = this.form.get('nickname') as FormControl
    this.passwordCtl = this.form.get('passwordGroup.password') as FormControl
    this.repasswordCtl = this.form.get('passwordGroup.repassword') as FormControl
    this.passwordGroupCtl = this.form.get('passwordGroup') as FormGroup
  }

  back() {
    this.router.navigateByUrl('/tabs/login-guide')
  }

  goToLoginPage() {
    this.navCtl.navigateForward('/tabs/login')
  }

  register() {
    markAsTouched(this.form)

    if (this.form.valid) {
      this.authService
        .register(this.mobileCtl.value, this.nicknameCtl.value, this.passwordCtl.value)
        .pipe(take(1))
        .subscribe()
    }
  }
}

function validatePasswordGroup(group: FormGroup): ValidationErrors {
  const password = group.get('password').value
  const repassword = group.get('repassword').value

  return password === repassword
    ? null
    : {
        passwordsInconsistent: true
      }
}
