import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'
import { from, of, throwError } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { BASE_URL } from '../app.module'
import { storageList } from '../configs/storage-list.config'
import { UserInfoResponse } from '../models/user-info-response.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private storage: Storage,
    private http: HttpClient,
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
}
