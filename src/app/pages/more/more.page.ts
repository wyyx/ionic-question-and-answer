import { Component, OnInit } from '@angular/core'
import { take, tap } from 'rxjs/operators'
import { UserInfoResponse } from 'src/app/models/user-info-response.model'
import { AuthService } from 'src/app/services/auth.service'
import { LoadingController } from '@ionic/angular'
import { LoadingService } from 'src/app/services/loading.service'
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss']
})
export class MorePage implements OnInit {
  isLoggedIn$: Observable<boolean>
  userInfo: UserInfoResponse
  userHeadFace: string
  defaultAvatar =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAqSgntSyr5fI7nrM9WV-6jQjbqSO_q7ZcSn2uZfsbsWhS_HSn'

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private loadingService: LoadingService,
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

  goToUserCenterPage() {
    this.isLoggedIn$
      .pipe(
        tap(isLoggedIn => {
          // if (isLoggedIn) {
          this.router.navigateByUrl('/tabs/user-center')
          // }
        }),
        take(1)
      )
      .subscribe()
  }
}
