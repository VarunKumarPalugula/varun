import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { ResolveEnd } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPassword: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,

  ) { }

  ngOnInit() {
    this.forgotPassword = this.formBuilder.group({
      number: ['', Validators.required],
      newPassword: ['', Validators.required],
      verifyPassword: ['', Validators.required]
    });
  }

  onSubmit(): boolean {
    this.submitted = true;
    if (this.forgotPassword.invalid) {
      return;
    }
    this.checkUser(this.forgotPassword);
  }

  checkUser(userDetails) {
    let userExist = false;
    this.authService.checkUser().subscribe(allUser => {
      allUser.forEach(function (user, index) {
        if (user['number'] === userDetails.value.number) {
          userExist = true;
        }
      });
      if (userExist) {
        this.authService.updatePassword(userDetails.value.number, userDetails.value.verifyPassword).subscribe(res =>{
          console.log(res);
        });
      } else {
        this.alertService.presentToast(`Invalied phone number!!!`);
      }
    },
      error => {
        this.alertService.presentToast(`Registration Failed please try again after some time!!!`);
      })
  }

  get input(): any {
    return this.forgotPassword.controls;
  }


}
