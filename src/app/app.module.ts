import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent, FqaComponent } from './index';
import { LoginPage, RegisterPage } from './pages/auth/index';
import { SharedModule } from './shared/shared.module'
import { IonicStorageModule } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';



@NgModule({
  declarations: [AppComponent, LandingComponent, LoginPage, RegisterPage, FqaComponent],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidPermissions
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginPage, RegisterPage]

})
export class AppModule { }
