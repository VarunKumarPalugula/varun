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
  ) {
   }

  ngOnInit() {
    this.forgotPassword = this.formBuilder.group({
      number: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      verifyPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  numberValidation() {
    this.validNumber = this.commonService.numberValid(this.forgotPassword.get('number').value);
  }

  onSubmit() {
   

     if (this.forgotPassword.invalid  || this.validNumber == 'INVALID') {
      this.commonService.presentToast('Please check your login details');
      return;
    } else if (this.forgotPassword.get('newPassword').value !== this.forgotPassword.get('verifyPassword').value) {
      this.commonService.presentToast(`password mismatch`);
      return;
    }
     
    this.checkUser(this.forgotPassword);

  }


  checkUser(userDetails) {
    this.commonService.presentLoading('registering user...');
    this.apiService.find( { number: this.forgotPassword.get('number').value }, 'user').subscribe(res => {
      // this.apiService.getAllData(this.loggedInType).subscribe(allUser => {
      //   allUser = allUser.filter(user => (user['number'] === userDetails.value.number))
        if (res) {
            this.apiService.updateData('user', res[0]['_id'], { 'password': userDetails.value.verifyPassword }).subscribe(res => {
              this.login('Password Sussfully changed!!!');
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
