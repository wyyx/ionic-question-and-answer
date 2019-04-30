import { Component, OnInit } from '@angular/core'
import { Storage } from '@ionic/storage'
import { storageList } from 'src/app/configs/storage-list.config'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'
import { ConfigService } from 'src/app/services/config.service'
import { tap, catchError } from 'rxjs/operators'
import { NavController } from '@ionic/angular'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { mobileValidator } from 'src/app/utils/mobile.validator'
import { of } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form: FormGroup
  mobileCtl: FormControl
  passwordCtl: FormControl

  backText: string
  error: string

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private storage: Storage,
    private navCtl: NavController,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.backText = this.configService.backText

    this.setupForm()
  }

  setupForm() {
    this.form = this.fb.group({
      mobile: ['', Validators.compose([Validators.required, mobileValidator])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    })

    this.mobileCtl = this.form.get('mobile') as FormControl
    this.passwordCtl = this.form.get('password') as FormControl
  }

  back() {
    this.router.navigateByUrl('/tabs/login-guide')
  }

  goToRegisterPage() {
    this.navCtl.navigateForward('/tabs/register')
  }

  login() {
    const mobile = this.form.value.mobile
    const password = this.form.value.password

    if (this.form.valid) {
      this.authService
        .login(mobile, password)
        .pipe(
          tap(res => {
            console.log('TCL: LoginPage -> login -> res', res)

            this.storage.set(storageList.userId, res.UserId)
            this.storage.set(storageList.user, {
              userId: res.UserId,
              nickName: res.UserNickName,
              avatar: res.UserHeadface
            } as User)
          }),
          catchError(error => {
            console.log('TCL: LoginPage -> login -> error', error)
            return of(error)
          })
        )
        .subscribe()
    }
  }
}
