import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-login-guide',
  templateUrl: './login-guide.page.html',
  styleUrls: ['./login-guide.page.scss']
})
export class LoginGuidePage implements OnInit {
  constructor(private navCtl: NavController) {}

  ngOnInit() {}

  goToLoginPage() {
    this.navCtl.navigateForward('/tabs/login')
  }

  goToRegisterPage() {
    this.navCtl.navigateForward('/tabs/register')
  }
}
