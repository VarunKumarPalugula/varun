import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './index';
import { LoginPage, RegisterPage } from './pages/auth/index';
import { SharedModule } from './shared/shared.module'
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileUploadModule } from "ng2-file-upload";
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

@NgModule({
  declarations: [AppComponent, LandingComponent, LoginPage, RegisterPage],
  imports: [
    SharedModule,
    BrowserModule,
    FileUploadModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'ddnqswqbt' } as CloudinaryConfiguration),
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginPage, RegisterPage]

})
export class AppModule { }
