import { Injectable, Inject } from '@angular/core'
import { Observable, from } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseRestService } from './base-rest.service'
import { LoginResponse } from '../models/login-response.model'
import { RegisterResponse } from '../models/register-response.model.1'
import { BASE_URL } from '../app.module'
import { map, tap, take } from 'rxjs/operators'
import { Storage } from '@ionic/storage'
import { storageList } from '../configs/storage-list.config'

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseRestService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) baseUrl: string,
    private storage: Storage
  ) {
    super(baseUrl)
  }

  login(mobile, password): Observable<LoginResponse> {
    return this.http
      .get<string>(this.baseUrl + 'account/login', {
        headers: this.headers,
        params: { mobile, password }
      })
      .pipe(map(res => JSON.parse(res) as LoginResponse))
  }

  register(mobile, nickname, password): Observable<RegisterResponse> {
    return this.http.get<RegisterResponse>(this.baseUrl + 'account/register', {
      headers: this.headers,
      params: { mobile, nickname, password }
    })
  }

  logout() {
    this.storage.remove(storageList.user)
    this.storage.remove(storageList.userId)
  }

  isLoggedIn() {
    return from(this.storage.get(storageList.userId)).pipe(map(userId => !!userId))
  }
}
