import { Component, OnInit } from '@angular/core'
import { take, tap } from 'rxjs/operators'
import { UserInfoResponse } from 'src/app/models/user-info-response.model'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss']
})
export class MorePage implements OnInit {
  userInfo: UserInfoResponse
  userHeadFace: string
  defaultAvatar =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAqSgntSyr5fI7nrM9WV-6jQjbqSO_q7ZcSn2uZfsbsWhS_HSn'

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.authService
      .getUserInfo()
      .pipe(
        tap(userInfo => {
          console.log('TCL: MorePage -> ngOnInit -> userInfo', userInfo)

          this.userInfo = userInfo
        }),
        take(1)
      )
      .subscribe()
  }
}
