import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavController, AlertController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loginForm: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      username: ['', Validators .required],
      email: ['', Validators .required],
      password: ['', Validators.required]
     });
  }

  get input(): any {
    return this.loginForm.controls;
  }

  onSubmit(): boolean {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.conformRegistor();
  }

  async conformRegistor() {
    const alert = await this.alertController.create({
      header: 'User Successfully Registered !!!',
      subHeader: '',
      message: 'Please Login with your username or email',
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


  // register() {
  //   this.authService.register(form.value.fName, form.value.lName, form.value.email, form.value.password).subscribe(
  //     data => {
  //       this.authService.login(form.value.email, form.value.password).subscribe(
  //         data => {
  //         },
  //         error => {
  //           console.log(error);
  //         },
  //         () => {
  //           this.dismissRegister();
  //           this.navCtrl.navigateRoot('/dashboard');
  //         }
  //       );
  //       this.alertService.presentToast(data['message']);
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     () => {
  //     }
  //   );
  // }
}
