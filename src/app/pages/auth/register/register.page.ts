import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavController, AlertController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
// import { NativeStorage } from '@ionic-native/native-storage';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registorForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    public alertController: AlertController,
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.registorForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get input(): any {
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
    this.authService.checkUser().subscribe(allUser => {
      allUser.forEach(function (user, index) {
        if (user['number'] === userDetails.value.number) {
          userExist = true;
        }
      });
      if (userExist) {
        this.conformRegistor('user allready registored please login');
      } else {
        this.register();
      }
    },
      error => {
        this.alertService.presentToast('Registration Failed please try again after some time!!!');
      })
  }

  register() {
    this.authService.register(this.registorForm.value.username, this.registorForm.value.email, this.registorForm.value.number, this.registorForm.value.password).subscribe((data) => {
      console.log(data);
      this.conformRegistor(`User Successfully Registered using this number ${data.number}`);
    },
      error => {
        this.alertService.presentToast('Registration Failed please try again after some time!!!');
      })
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
