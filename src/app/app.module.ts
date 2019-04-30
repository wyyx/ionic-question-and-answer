import { NgModule, InjectionToken } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { IonicStorageModule } from '@ionic/storage'
import { HttpClientModule } from '@angular/common/http'
import { environment } from 'src/environments/environment'
export const BASE_URL = new InjectionToken<string>('App base url')

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: BASE_URL, useValue: environment.baseUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
