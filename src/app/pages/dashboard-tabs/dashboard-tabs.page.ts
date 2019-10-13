import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard-tabs',
  templateUrl: './dashboard-tabs.page.html',
  styleUrls: ['./dashboard-tabs.page.scss'],
})
export class DashboardTabsPage implements OnInit {
  isDisableShop = false;
  constructor(
    private commonService: CommonService,
    private apiService: ApiService,

  ) {
  }

  ngOnInit() {
    this.commonService.getToken().then(res => {
      let loggedInUser = JSON.parse(res['data']);
      this.apiService.find({ number: loggedInUser['number'] }, 'shopDetails').subscribe(res => {
        if (res.length > 0) {
          this.isDisableShop = true;
        }
      });
    });
  }



}
