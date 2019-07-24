import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { ResolveEnd } from '@angular/router';
import { ModalController, ToastController, NavController, AlertController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

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
    public alertController: AlertController,
    private modalController: ModalController,
    private navCtrl: NavController,

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
    let _id;
    this.authService.checkUser().subscribe(allUser => {
      for (let i = 0; i < allUser.length; i++) {
        if (allUser[i]['number'] === userDetails.value.number) {
          userExist = true;
          _id = allUser[i]['_id']
          break;
        }
      }
      console.log(userDetails.value);

      if (userExist) {
        this.authService.updatePassword(_id, { 'password' : userDetails.value.verifyPassword } ).subscribe(res => {
          console.log(res);
          this.login('Password Sussfully changed!!!');
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

  async login(message) {
    const alert = await this.alertController.create({
      header: message,
      subHeader: '',
      message: 'Please Login with your number',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.navCtrl.navigateRoot('/dashboard');
          }
        },
        {
          text: 'Login',
          role: 'Login',
          handler: () => {
            this.loginModal();
          }
        },
      ]
    });

    await alert.present();
  }

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

    // On Login button tap, dismiss Register modal and open login Modal
    async loginModal() {
      const loginModal = await this.modalController.create({
        component: LoginPage,
      });
      return await loginModal.present();
    }

}
