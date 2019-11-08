import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

import { ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})


export class CommonService {

  constructor(
    private storageService: StorageService,
    private toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  getToken() {
    let isLoggedIn;
   return this.storageService.getItem('userDetails').then((val) => {
      if (isNullOrUndefined(val)) {
        isLoggedIn = true;
      } else {
        isLoggedIn = false;
      }
      return isLoggedIn;
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
  
  numberValid(number) {
    let validNumber;
    if (number !== null) {
      if (number.toString().length <= 10) {
        if (number.toString().length != 10) {
          validNumber = 'INVALID';
        } else {
          validNumber = 'VALID';
        }
      } else {
        validNumber = 'INVALID';
        event.preventDefault();
      }
    }
    return validNumber;
  }

}
