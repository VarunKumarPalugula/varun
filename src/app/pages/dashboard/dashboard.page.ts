import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalController, MenuController, Platform, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: any;

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private navCtrl: NavController,

  ) {
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // this.storage.getItem('token').then(data => {
    //   console.log(data)
    // },
    //   error => {
    //   }
    // )
    if (this.authService.getToken().isLoggedIn) {
      this.user = (this.authService.getToken().data).charAt(0);;
    }
    console.log(this.user);
  }

  openProfile() {
    this.navCtrl.navigateRoot('/profile');
  }



}
