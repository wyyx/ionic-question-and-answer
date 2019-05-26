import { ToastController, LoadingController } from '@ionic/angular'
import { Injectable } from '@angular/core'

interface LoadingOptions {
  message: string
  backdropDismiss: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(private loadingCtrl: LoadingController) {}

  async showLoading(loadingOptions: LoadingOptions) {
    const loading = await this.loadingCtrl.create({
      ...loadingOptions
    })

    loading.present()
    return loading
  }
}
