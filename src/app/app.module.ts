import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouteReuseStrategy } from '@angular/router';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { NativeStorage } from '@ionic-native/native-storage';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { ItemListComponent } from './pages/dashboard/item-list/item-list.component';
@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  declarations: [AppComponent, ProfileComponent,
    ItemListComponent],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
  entryComponents: []


})
export class AppModule {}
