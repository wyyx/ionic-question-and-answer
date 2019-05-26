import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, filter, map, tap } from 'rxjs/operators'
import { BASE_URL } from '../app.module'
import { storageList } from '../configs/storage-list.config'
import { LoginResponse } from '../models/login-response.model'
import { RegisterResponse } from '../models/register-response.model.1'
import { ToastService } from './toast.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  isLoggedInSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject$.asObservable()

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router,
    @Inject(BASE_URL) private baseUrl: string,
    private storage: Storage
  ) {
    this.checkAuth()
  }

  login(mobile, password): Observable<LoginResponse> {
    return this.http
      .get<string>(this.baseUrl + '/account/login', {
        headers: this.headers,
        params: { mobile, password }
      })
      .pipe(
        map(res => JSON.parse(res) as LoginResponse),
        tap(res => {
          this.toastService.showToast({
            message: res.StatusContent
          })

          if (res.UserId) {
            this.saveAuth(res.UserId)
            this.isLoggedInSubject$.next(true)
          }
        }),
        filter(res => !!res.UserId),
        catchError(error => {
          this.toastService.showToast({
            message: '很抱歉，出现意外错误，请稍后再试'
          })

          return throwError(error)
        })
      )
  }

  register(mobile, nickname, password): Observable<RegisterResponse> {
    return this.http
      .get<string>(this.baseUrl + '/account/register', {
        headers: this.headers,
        params: { mobile, nickname, password }
      })
      .pipe(
        map(res => JSON.parse(res) as RegisterResponse),
        tap(res => {
          console.log('TCL: AuthService -> res', res)
          this.toastService.showToast({
            message: res.StatusContent
          })

          this.router.navigate(['/tabs/login'])
        }),
        catchError(error => {
          this.toastService.showToast({
            message: '很抱歉，出现意外错误，请稍后再试'
          })

          return throwError(error)
        })
      )
  }
  checkAuth() {
    this.storage.get(storageList.userId).then(userId => {
      if (userId) {
        this.isLoggedInSubject$.next(true)
      }
    })
  }

  saveAuth(userId: string) {
    this.storage.set(storageList.userId, userId)
  }

  logout() {
    this.isLoggedInSubject$.next(false)

    this.storage.remove(storageList.user)
    this.storage.remove(storageList.userId)
  }
}
