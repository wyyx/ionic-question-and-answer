import { ToastController } from '@ionic/angular'
import { Injectable } from '@angular/core'

interface ToastOptions {
  message: string
  duration?: number
  showCloseButton?: boolean
  closeButtonText?: string
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(public toastController: ToastController) {}

  async presentToast(toastOptions: ToastOptions) {
    const { duration, showCloseButton, closeButtonText } = toastOptions

    const toast = await this.toastController.create({
      ...toastOptions,
      duration: duration ? duration : 2000,
      showCloseButton: showCloseButton ? showCloseButton : true,
      closeButtonText: closeButtonText ? closeButtonText : '关闭'
    })
    toast.present()
  }
}
