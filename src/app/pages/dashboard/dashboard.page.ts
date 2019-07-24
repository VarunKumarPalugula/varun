import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';
// import { NativeStorage } from '@ionic-native/native-storage';

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
    // private storage: NativeStorage,


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
      this.user = this.authService.getToken().data;
    }
  }

}
