import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  
})
export class ProfileComponent implements OnInit {
  user: string;
  expandProfile = false;
  constructor(
    private authService: AuthService,
    
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    // this.storage.getItem('token').then(data => {
    //   console.log(data)
    // },
    //   error => {
    //   }
    // )
    if (this.authService.getToken().isLoggedIn) {
      this.user = this.authService.getToken().data;
    }
  }

}
