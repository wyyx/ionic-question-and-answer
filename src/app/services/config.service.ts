import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  backText: string;

  constructor(private platform: Platform) {
    this.setBackText();
  }

  setBackText() {
    if (this.platform.is('android')) {
      this.backText = null;
    } else {
      this.backText = '后退';
    }
  }
}
