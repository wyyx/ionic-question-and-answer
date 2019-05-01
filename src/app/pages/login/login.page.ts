import { Component, OnInit } from '@angular/core'
import { Storage } from '@ionic/storage'
import { storageList } from 'src/app/configs/storage-list.config'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'
import { ConfigService } from 'src/app/services/config.service'
import { tap, catchError, filter, take } from 'rxjs/operators'
import { NavController } from '@ionic/angular'
import { Router, NavigationStart, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { mobileValidator } from 'src/app/validators/mobile.validator'
import { of, Observable } from 'rxjs'
import { ToastService } from 'src/app/services/toast.service'

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

  navStart: Observable<NavigationStart>

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private toastService: ToastService,
    private storage: Storage,
    private navCtl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.backText = this.configService.backText

    this.setupForm()
  }

  ionViewWillEnter() {
    this.authService
      .isLoggedIn()
      .pipe(
        tap(isLoggedIn => {
          if (isLoggedIn) {
            this.router.navigateByUrl('/tabs/home')
          }
        }),
        take(1)
      )
      .subscribe()
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
            this.toastService.presentToast({
              message: res.StatusContent
            })

            if (res.UserId) {
              // save auth info
              this.storage.set(storageList.userId, res.UserId)
              this.storage.set(storageList.user, {
                userId: res.UserId,
                nickName: res.UserNickName,
                avatar: res.UserHeadface
              } as User)

              // go to targetUrl or home page
              const url = this.route.snapshot.queryParamMap.get('targetUrl')
              this.router.navigate([url || '/tabs/home'])
            }
          }),
          catchError(error => {
            this.toastService.presentToast({
              message: '很抱歉，出现意外错误，请稍后再试'
            })
            return of(error)
          })
        )
        .subscribe()
    }
  }
}
