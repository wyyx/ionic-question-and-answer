import { ToastController, LoadingController } from '@ionic/angular'
import { Injectable } from '@angular/core'
import { LoadingOptions } from '@ionic/core'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(private loadingCtrl: LoadingController) {}

  async showLoading(options: LoadingOptions) {
    const loading = await this.loadingCtrl.create({
      ...options
    })

    loading.present()
    return loading
  }
}
