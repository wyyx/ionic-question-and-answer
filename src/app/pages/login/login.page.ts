import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, NavigationStart, Router } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'
import { take, tap, catchError } from 'rxjs/operators'
import { AuthService } from 'src/app/services/auth.service'
import { ConfigService } from 'src/app/services/config.service'
import { markAsTouched } from 'src/app/utils/form.util'
import { mobileValidator } from 'src/app/validators/mobile.validator'

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
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.backText = this.configService.backText

    this.setupForm()
  }

  ionViewWillEnter() {
    this.authService.isLoggedIn$
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
    this.router.navigateByUrl('/tabs/register')
  }

  login() {
    markAsTouched(this.form)
    const mobile = this.form.value.mobile
    const password = this.form.value.password

    if (this.form.valid) {
      this.authService
        .login(mobile, password)
        .pipe(
          take(1),
          tap(res => {
            if (res) {
              const targetUrl = this.route.snapshot.queryParamMap.get('targetUrl')
              this.router.navigate([targetUrl || '/tabs/home'])
            }
          }),
          catchError(err => {
            return of(null)
          })
        )
        .subscribe()
    }
  }
}
