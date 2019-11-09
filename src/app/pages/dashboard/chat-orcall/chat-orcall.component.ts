import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-chat-orcall',
  templateUrl: './chat-orcall.component.html',
  styleUrls: ['./chat-orcall.component.scss'],
})
export class ChatORcallComponent implements OnInit {
  contacts: any;

  constructor(private navCtrl: NavController,private apiService: ApiService,

    ) {
      this.apiService.find( { loggedIn: true, topic : '' }, 'user').subscribe(res => {
        this.contacts = res;
      })
     }

  ngOnInit() {

  }

  back() {
    this.navCtrl.navigateRoot('/dashboard');
  }
}
