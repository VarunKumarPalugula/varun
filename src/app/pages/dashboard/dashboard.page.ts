import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ModalController, Platform, NavController, ToastController, AlertController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { StorageService } from '../../services/storage.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  loggedInUser: any;
  topics = [];
  item: any;

  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    public alertController: AlertController,
    private modalController: ModalController,
    private commonService: CommonService,
    public storageService: StorageService,

  ) {

  }

  ngOnInit() {
    this.storageService.getItem('userDetails').then(res => {
      this.loggedInUser = JSON.parse(res);
      this.apiService.getAllData('topics').subscribe(result => {
        for (let t = 0; t < result.length; t++) {
          for (let u = 0; u < this.loggedInUser.topic.length; u++) {
            if (result[t]['topic'] == this.loggedInUser.topic[u]) {
              this.topics.push(result[t]);
            }
          }
        }
      });
    });
  }

  openGroupList() {
    this.navCtrl.navigateRoot('/dashboard/group-list');
  }

  ionViewWillEnter() {
  }

  openContactList(i) {
    if (isNullOrUndefined(this.item)) {
      this.item = i;
    } else {
      if (i == this.item) {
        this.item = null;
      } else {
        this.item = i
      }
    }
  }

  openTopics(topic) {
    console.log(topic)
    this.commonService.presentLoading('User login...');
    this.apiService.updateData('user', this.loggedInUser['_id'], { 'topic': topic['topic'] }).subscribe(res => {
      this.storageService.addItem('topic', topic['topic'])
      this.commonService.dismissLoading();
    });
  }



  logout() {
    this.commonService.presentLoading('please wait...');
    this.apiService.updateData('user', this.loggedInUser['_id'], { 'loggedIn': false }).subscribe(res => {
      this.storageService.addItem('userDetails', null);
      this.navCtrl.navigateRoot('/landing');
      this.commonService.dismissLoading();
    });
  }


}