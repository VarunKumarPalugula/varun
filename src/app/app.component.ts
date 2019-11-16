import { Component, Inject } from '@angular/core';
import { Platform  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public apiService : ApiService,
    private androidPermissions: AndroidPermissions
  ) {
    this.initializeApp();
    
    this.apiService.ccInIt();
  }

   
 
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.androidPermissions.requestPermissions(
        [
          this.androidPermissions.PERMISSION.CAMERA,
          this.androidPermissions.PERMISSION.CALL_PHONE,
          this.androidPermissions.PERMISSION.GET_ACCOUNTS,
          this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
          this.androidPermissions.PERMISSION.RECORD_AUDIO
        ]
      );
    });
  }

}
