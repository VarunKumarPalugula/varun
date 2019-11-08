import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { ModalController, MenuController, Platform, NavController, ToastController, AlertController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  expandProfile = false;
  shopDetails: any;

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private modalController: ModalController,
    public storageService: StorageService,
    private navCtrl: NavController,

  ) { }

  ngOnInit() {
    // this.commonService.getToken().then(res => {
    //   this.shopDetails = JSON.parse(res['data']);
    //   console.log(this.shopDetails);
    // })
  }

  updateDetails() {
    // const registerModal = await this.modalController.create({
    //   component: CreateShopComponent,
    //   componentProps: {
    //     item: this.shopDetails
    //   }
    // });
    // return await registerModal.present();
  }

  ionViewWillEnter() {


  }


  logout() {
    this.storageService.addItem('userDetails', null);
    this.navCtrl.navigateRoot('/landing');
  }

  getUploadedImage(image) {
    this.deleteImage()
  }

  deleteImage = function () {
    const url = `https://api.cloudinary.com/v1_1/ddnqswqbt/delete_by_token`;
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers: headers };
    const body = {
      token: this.deleteToken.delete_token
    };
    this.http.post(url, body, options).subscribe(response => {
      console.log(`Deleted image - ${this.deleteToken.public_id} ${response.result}`);
    });
  };


}
