import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResolveEnd } from '@angular/router';
import { ModalController, ToastController, NavController, AlertController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotPassword: FormGroup;
  submitted = false;
  number: any;
  validNumber: any;
  newPassword: boolean;
  verifyPassword: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private modalController: ModalController,
    private navCtrl: NavController,
    public apiService: ApiService,
    public commonService: CommonService,
    public storageService: StorageService
  ) { }

  ngOnInit() {
    this.forgotPassword = this.formBuilder.group({
      number: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      verifyPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    console.log(this.forgotPassword)
    this.submitted = true;
    if (this.forgotPassword.invalid) {
      return;
    }
    this.checkUser(this.forgotPassword);
    if (this.forgotPassword.get('newPassword').value !== this.forgotPassword.get('verifyPassword').value) {
      this.forgotPassword.controls.verifyPassword.setErrors({ passwordMismatch: true });
    }
  }

  numberValidation() {
    this.number = true;
    if (this.forgotPassword.get('number').value !== null) {
      if ((this.forgotPassword.get('number').value).toString().length != 10) {
        this.validNumber = 'INVALID';
      } else {
        this.validNumber = 'VALID';
        this.number = false;
      }
    } else {
      this.validNumber = 'VALID';
    }
  }

  checkUser(userDetails) {
    let userExist = false;
    let _id;
    this.commonService.presentLoading('registering user...');
    this.storageService.getItem('type').then((val) => {
      this.apiService.getAllData(val).subscribe(allUser => {
        for (let i = 0; i < allUser.length; i++) {
          if (allUser[i]['number'] === userDetails.value.number) {
            userExist = true;
            _id = allUser[i]['_id']
            break;
          }
        }

        if (userExist) {
          this.storageService.getItem('type').then((val) => {
            this.apiService.updateData(val, _id, { 'password': userDetails.value.verifyPassword }).subscribe(res => {
              this.login('Password Sussfully changed!!!');
            });
          });
        } else {
          this.commonService.presentToast(`Invalied phone number!!!`);
        }
        this.commonService.dismissLoading();
      },
        error => {
          this.commonService.dismissLoading();
          this.commonService.presentToast(`Registration Failed please try again after some time!!!`);
        })
    });
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
            this.navCtrl.navigateRoot('/landing');
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
