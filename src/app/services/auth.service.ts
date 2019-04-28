import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseRestService } from './base-rest.service'
import { LoginResponse } from '../models/login-response.model'
import { RegisterResponse } from '../models/register-response.model.1'

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseRestService {
  constructor(private http: HttpClient) {
    super()
  }

  login(mobile, password): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(this.baseUrl + 'account/login', {
      headers: this.headers,
      params: { mobile, password }
    })
  }

  register(mobile, nickname, password): Observable<RegisterResponse> {
    return this.http.get<RegisterResponse>(this.baseUrl + 'account/register', {
      headers: this.headers,
      params: { mobile, nickname, password }
    })
  }
}
