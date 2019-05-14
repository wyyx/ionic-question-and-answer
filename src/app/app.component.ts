import { Component, OnInit } from '@angular/core'

import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage'
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp()
  }

  ngOnInit(): void {}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()

      this.checkAuth()
    })
  }

  checkAuth() {
    this.storage.get('userId').then(userId => {
      if (!userId) {
        this.router.navigateByUrl('/tabs/login-guide')
      }
    })
  }
}
