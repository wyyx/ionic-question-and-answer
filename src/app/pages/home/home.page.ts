import { Component, OnInit } from '@angular/core'
import { Storage } from '@ionic/storage'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  isLoggedIn$: Observable<boolean>
  constructor(private authService: AuthService, private storage: Storage) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$
  }

  logout() {
    this.authService.logout()
  }
}
