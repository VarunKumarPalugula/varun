import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, AfterViewInit {
  userDetails: any;

  constructor(
    private authService: AuthService,

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  ngAfterViewInit() {

    let _id = localStorage.getItem('_id');
    this.authService.findById(_id).subscribe(userDetails => {
      this.userDetails = userDetails
      console.log(this.userDetails)

    });

  }

}
