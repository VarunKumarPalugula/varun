import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavController, AlertController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { StorageService } from '../../../services/storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registorForm: FormGroup;
  submitted = false;
  number: boolean;
  password: boolean;
  email: boolean
  validNumber: any;
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    public alertController: AlertController,
    private toastController: ToastController,
    private navCtrl: NavController,
    public apiService: ApiService,
    public commonService: CommonService,
    public storageService: StorageService
  ) { }

  ngOnInit() {
    this.registorForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [ Validators.required , Validators.email]],
      number: ['', Validators.required],
      password: ['', [ Validators.required, Validators.minLength(8)]]
    });
  }

  numberValidation() {
    this.number = true;
    if (this.registorForm.get('number').value !== null) {
      if ((this.registorForm.get('number').value).toString().length != 10) {
        this.validNumber = 'INVALID';
      } else {
        this.validNumber = 'VALID';
        this.number = false;
      }
    } else {
      this.validNumber = 'VALID';
    }
  }

  get input(): any {
    console.log(this.registorForm)
    return this.registorForm.controls;
  }

  onSubmit(): boolean {
    this.submitted = true;
    if (this.registorForm.invalid) {
      return;
    }
    this.checkUser(this.registorForm);
  }

  checkUser(userDetails) {
    let userExist = false;
    this.commonService.presentLoading('registering user...');
    this.storageService.getItem('type').then((val) => {
      this.apiService.getAllData(val).subscribe(allUser => {
        allUser.forEach(function (user, index) {
          console.log(user);
          if (user['number'] === userDetails.value.number) {
            userExist = true;
          }
        });
        if (userExist) {
          this.conformRegistor('user allready registored please login');
        } else {
          this.register();
        }
        this.commonService.dismissLoading();
      },
        error => {
          this.commonService.dismissLoading();
          this.commonService.presentToast('Registration Failed please try again after some time!!!');
        })
    });
  }


  register() {
    this.storageService.getItem('type').then((val) => {
      this.apiService.saveData(this.registorForm['value'], val).subscribe((data) => {
        this.commonService.dismissLoading();
        this.conformRegistor(`User Successfully Registered using this number ${data.number}`);
      },
        error => {
          this.commonService.dismissLoading();
          this.commonService.presentToast('Registration Failed please try again after some time!!!');
        });
    });
  }

  async conformRegistor(message) {
    const alert = await this.alertController.create({
      header: message,
      subHeader: '',
      message: 'Please Login with your number',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.dismissRegister();
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

  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }

  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

}
