import { Injectable } from '@angular/core';
import { CommonService } from './services/common.service';
import { isNullOrUndefined } from 'util';
import { ModalController, MenuController, Platform, NavController,  } from '@ionic/angular';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor( private commonService: CommonService, private navCtrl: NavController,

  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    this.commonService.getToken().then(res => {
      if (res) {
        return true;
      } else {
        this.navCtrl.navigateRoot('/dashboard-tabs');
      }
    })
  }
  // canActivate(): boolean {
  //   console.log(this.commonService.getToken())
  //   if (!isNullOrUndefined(this.commonService.getToken())) {
  //     return true;
  //   } else {
  //     this.navCtrl.navigateRoot('/dashboard-tabs');
  //   }
  // }
}
