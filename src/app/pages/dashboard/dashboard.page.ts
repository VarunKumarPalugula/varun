import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ModalController, Platform, NavController, ToastController, AlertController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  loggedInUser: any;
  topics: any;
  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    public alertController: AlertController,
    private modalController: ModalController,
    private commonService: CommonService,
    public storageService: StorageService,

  ) {
    this.apiService.getAllData('topics').subscribe(res => {
      console.log(res)
      this.topics = res;
    })
  }

  ngOnInit() {
    this.storageService.getItem('userDetails').then(res => {
      this.loggedInUser = JSON.parse(res);
    });

  }

  ionViewWillEnter() {


  }

  openCallORchat(topic) {
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

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

}