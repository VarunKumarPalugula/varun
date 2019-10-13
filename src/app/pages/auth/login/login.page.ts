import { Component, OnInit } from '@angular/core';
import { RegisterPage } from '../register/register.page';
import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { ModalController, ToastController, NavController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  number: any;
  validNumber: any;
  password = false;
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private navCtrl: NavController,
    public alertController: AlertController,
    public apiService: ApiService,
    public commonService: CommonService,
    public storageService: StorageService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      number: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get input(): any {
    return this.loginForm.controls;
  }

  numberValidation() {
    this.number = true;
    if (this.loginForm.get('number').value !== null) {
      if ((this.loginForm.get('number').value).toString().length != 10) {
        this.validNumber = 'INVALID';
      } else {
        this.validNumber = 'VALID';
        this.number = false;
      }
    } else {
      this.validNumber = 'VALID';
    }
  }

  onSubmit(): boolean {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.checkUser(this.loginForm);
  }

  checkUser(userDetails) {
    let selctedUser;
    let userExist = false;
    this.commonService.presentLoading('User login...');
    this.storageService.getItem('type').then((val) => {
      this.apiService.getAllData(val).subscribe(allUser => {
        for (let i = 0; i < allUser.length; i++) {
          if (allUser[i]['number'] === userDetails.value.number) {
            userExist = true;
            selctedUser = allUser[i]['password'];
            this.storageService.addItem('userDetails', JSON.stringify(allUser[i]));
            break;
          }
        }
        if (userExist) {
          if (selctedUser === userDetails.value.password) {
            this.dismissLogin();
            this.navCtrl.navigateRoot('/dashboard-tabs/dashboard');
          } else {
            this.commonService.presentToast('Invalid password');
          }
        } else {
          this.conformationRegistor('User is not registered Please registor first');
        }
        this.commonService.dismissLoading();
      },
        error => {
          this.commonService.dismissLoading();
          this.commonService.presentToast('Registration Failed please try again after some time!!!');
        })
    });


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
