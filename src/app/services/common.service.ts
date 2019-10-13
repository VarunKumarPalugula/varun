import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

import { ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})


export class CommonService {

  isLoggedIn = false;
  token: any;
  constructor(
    private storageService: StorageService,
    private toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  getToken() {
    return this.storageService.getItem('userDetails').then((val) => {
      if (val !== 'null') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      let final = {
        'data': val,
        'isLoggedIn': this.isLoggedIn
      }
      return final;
    });
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 7000,
      position: 'top',
      color: 'dark'
    });
    toast.present();
  }

  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message: message,
      duration: 3000000,
      spinner: null,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
  }

  async dismissLoading() {
    return await this.loadingController.dismiss();
  }

}
