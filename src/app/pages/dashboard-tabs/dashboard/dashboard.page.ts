import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ModalController, MenuController, Platform, NavController, ToastController, AlertController } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: any;
  displayShops: any;
  loggedInUser: any;
  constructor(
    private menu: MenuController,
    private apiService: ApiService,
    private navCtrl: NavController,
    public alertController: AlertController,
    private modalController: ModalController,
    private commonService: CommonService
  ) {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.commonService.getToken().then(res => {
      this.loggedInUser = JSON.parse(res['data']);
      this.apiService.find( { number: this.loggedInUser['number'] }, 'shopDetails').subscribe(res => {
        if (res.length > 0) {
          this.displayShops = res;
          console.log(this.displayShops)
        } else {
          this.createShop();
        }
      });
      console.log(this.loggedInUser)
    });
  }

  ionViewWillEnter() {


  }

  async createShop() {
    const alert = await this.alertController.create({
      header: 'Wellcome to Happy Shopping',
      subHeader: 'Please Create Shop Details',
      message: '',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.dismissLogin();
          }
        },
        {
          text: 'Create',
          role: 'Create',
          handler: () => {
            this.navCtrl.navigateRoot('dashboard-tabs/createShop');
          }
        },
      ]
    });

    await alert.present();
  }

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

}