import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  enableCard = true;

  constructor(
    private navCtrl: NavController,

  ) { }

  ngOnInit() { }

  addToCard() {
    this.enableCard = false;
  }
}
