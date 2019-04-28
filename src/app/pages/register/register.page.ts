import { Component, OnInit } from '@angular/core'
import { ConfigService } from 'src/app/services/config.service'
import { NavController } from '@ionic/angular'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  backText: string

  constructor(
    private configService: ConfigService,
    private navCtl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.backText = this.configService.backText
  }

  back() {
    this.router.navigateByUrl('/tabs/login-guide')
  }

  goToLoginPage() {
    this.navCtl.navigateForward('/tabs/login')
  }
}
