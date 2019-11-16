import { Component, OnInit } from '@angular/core';
import { RegisterPage } from '../register/register.page';
import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { ModalController, ToastController, NavController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../services/storage.service';
import { CometChat } from "@cometchat-pro/chat"
import { CometChatService } from '../../../services/comet-chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  validNumber: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private navCtrl: NavController,
    public alertController: AlertController,
    public apiService: ApiService,
    public commonService: CommonService,
    public storageService: StorageService,
    public cometChatService: CometChatService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      number: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  numberValidation() {
    this.validNumber = this.commonService.numberValid(this.loginForm.get('number').value);
  }

  onSubmit(): boolean {
    if (this.loginForm.invalid || this.validNumber == 'INVALID') {
      this.commonService.presentToast('Please check your login details');
      return;
    }
    this.checkUser(this.loginForm);
  }

  checkUser(userDetails) {
    this.commonService.presentLoading('User login...');
    this.apiService.find({ number: this.loginForm.get('number').value }, 'user').subscribe(res => {

      if (res.length !== 0) {

        if (res[0]['password'] === userDetails.value.password) {

          this.apiService.updateData('user', res[0]['_id'], { 'loggedIn': true }).subscribe(updateUser => {

            this.cometChatService.login(this.loginForm.get('number').value).subscribe(result => {

              console.log("Login Successful:");
              this.storageService.addItem('userDetails', JSON.stringify(updateUser));
              this.dismissLogin();
              this.commonService.dismissLoading();
              this.navCtrl.navigateRoot('/dashboard');

            }, error => {
              this.commonService.dismissLoading();
              this.commonService.presentToast('Invalid password');
            });

          });

        } else {
          this.commonService.dismissLoading();
          this.commonService.presentToast('Invalid password');
        }

      } else {
        this.commonService.dismissLoading();

        this.conformationRegistor('User is not registered Please registor first');
      }

    },
      error => {
        this.commonService.dismissLoading();
        this.commonService.presentToast('Registration Failed please try again after some time!!!');
      })
  }

  async conformationRegistor(message) {
    const alert = await this.alertController.create({
      header: message,
      subHeader: '',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.dismissLogin();
          }
        },
        {
          text: 'Register',
          role: 'Register',
          handler: () => {
            this.registerModal();
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


  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }



}
