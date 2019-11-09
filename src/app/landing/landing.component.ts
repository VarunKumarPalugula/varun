import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { isNullOrUndefined } from 'util';
import { ModalController, MenuController, Platform, NavController, ToastController, AlertController } from '@ionic/angular';
import { LoginPage, RegisterPage } from '../pages/auth/index';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private commonService: CommonService,
    private alertController: AlertController,
  ) { }

  ionViewWillEnter() {
    this.commonService.getToken().then(res => {
      if (res) {
        
      } else {
        this.navCtrl.navigateRoot('/dashboard');
      }
    })
  }

  ngOnInit() { }


  async register() {
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  async login() {
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

}
