import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ModalController, MenuController, Platform, NavController, ToastController, AlertController } from '@ionic/angular';
import { AddItemComponent } from './add-item/add-item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {

  enableCard = true;
  shopDetails: any;
  items: any;
  constructor(
    private navCtrl: NavController,
    private apiService: ApiService,
    private modalController: ModalController,
  ) {
    this.apiService.getAllData('shopDetails').subscribe(res => {
      this.shopDetails = res[0];
      console.log(this.shopDetails);
    })
  }

  ngOnInit() {
    this.apiService.getAllData('addItem').subscribe(res => {
      console.log(res);
      if (res.length > 0) {
        this.items = res;
      }
    })
  }

  ngAfterViewInit() {

  }


  addToCard() {
    this.enableCard = false;

  }

  pushNotification() {
    
  }

  async addItem(item?) {
    const registerModal = await this.modalController.create({
      component: AddItemComponent,
      componentProps: {
        item: item
      }
    });
    return await registerModal.present();
  }
}
