import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'
import { from, of, throwError } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { BASE_URL } from '../app.module'
import { storageList } from '../configs/storage-list.config'
import { UserInfoResponse } from '../models/user-info-response.model'
import { ToastService } from './toast.service'
import { UpdateNicknameResponse } from '../models/update-nickname-response.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private toastService: ToastService,
    @Inject(BASE_URL) private baseUrl: string
  ) {}

  getUserInfo() {
    return from(this.storage.get(storageList.userId)).pipe(
      map(userId => userId as string),
      switchMap((userId: string) => {
        if (userId) {
          return this.http.get<string>(this.baseUrl + '/account/userinfo', {
            params: {
              userid: userId
            }
          })
        }
        return of(null)
      }),
      map(userInfo => JSON.parse(userInfo) as UserInfoResponse),
      catchError(error => {
        return throwError(error)
      })
    )
  }

  updateUserNickName(nickname: string) {
    return from(this.storage.get(storageList.userId)).pipe(
      switchMap(userId => {
        if (userId) {
          console.log('TCL: UserService -> updateUserNickName -> userId', userId)
          return this.http.get(this.baseUrl + '/account/updatenickname', {
            params: {
              userid: userId,
              nickname
            }
          })
        }
        return of(null)
      }),
      map(res => JSON.parse(res) as UpdateNicknameResponse),
      tap(res => {
        console.log('TCL: UserService -> updateUserNickName -> res', res.StatusContent)
      }),
      catchError(err => {
        this.toastService.showToast({
          message: '很抱歉，出现意外错误，请稍后再试'
        })
        return throwError(err)
      })
    )
  }
}
