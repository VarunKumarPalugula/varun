import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private alertService: AlertService,
    private navCtrl: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.authService.getToken();
    });
  }

  logout() {
    this.navCtrl.navigateRoot('/landing');

    // this.authService.logout().subscribe(
    //   data => {
    //     this.alertService.presentToast(data['message']);
    //   },
    //   error => {
    //     console.log(error);
    //   },
    //   () => {
    //     this.navCtrl.navigateRoot('/landing');
    //   }
    // );
  }

}
