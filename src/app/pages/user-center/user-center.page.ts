import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { take, tap } from 'rxjs/operators'
import { UserInfoResponse } from 'src/app/models/user-info-response.model'
import { AuthService } from 'src/app/services/auth.service'
import { LoadingService } from 'src/app/services/loading.service'
import { UserService } from 'src/app/services/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.page.html',
  styleUrls: ['./user-center.page.scss']
})
export class UserCenterPage implements OnInit {
  isLoggedIn$: Observable<boolean>

  userInfo: UserInfoResponse
  userHeadFace: string
  defaultAvatar =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAqSgntSyr5fI7nrM9WV-6jQjbqSO_q7ZcSn2uZfsbsWhS_HSn'

  constructor(
    private loadingService: LoadingService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$
  }

  ionViewWillEnter() {
    this.loadUserInfo()
  }

  loadUserInfo() {
    const loadingRef = this.loadingService.showLoading({
      message: '正在加载...',
      backdropDismiss: false
    })

    this.userService
      .getUserInfo()
      .pipe(
        tap(userInfo => {
          console.log('TCL: MorePage -> ngOnInit -> userInfo', userInfo)

          this.userInfo = userInfo

          loadingRef.then(ref => ref.dismiss())
        }),
        take(1)
      )
      .subscribe()
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/tabs/more')
  }
}
