import { Component, OnInit } from '@angular/core'
import { Storage } from '@ionic/storage'
import { storageList } from 'src/app/configs/storage-list.config'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'
import { ConfigService } from 'src/app/services/config.service'
import { tap } from 'rxjs/operators'
import { NavController } from '@ionic/angular'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  mobile: string
  password: string

  backText: string
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private storage: Storage,
    private navCtl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.backText = this.configService.backText
  }

  back() {
    this.router.navigateByUrl('/tabs/login-guide')
  }

  goToRegisterPage() {
    this.navCtl.navigateForward('/tabs/register')
  }

  login() {
    this.authService
      .login(this.mobile, this.password)
      .pipe(
        tap(res => {
          this.storage.set(storageList.userId, res.UserId)
          this.storage.set(storageList.user, {
            userId: res.UserId,
            nickName: res.UserNickName,
            avatar: res.UserHeadface
          } as User)
        })
      )
      .subscribe()
  }
}
