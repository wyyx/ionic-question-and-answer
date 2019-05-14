import { HttpHeaders } from '@angular/common/http'
import { Inject } from '@angular/core'
import { BASE_URL } from '../app.module'

export abstract class HttpService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(@Inject(BASE_URL) public baseUrl: string) {}
}
