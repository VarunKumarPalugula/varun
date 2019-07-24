import { Component, OnInit } from '@angular/core';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { EnvService } from '../../../services/env.service';
import { ModalController, ToastController, NavController, AlertController } from '@ionic/angular';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
// import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private push: Push,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private envService: EnvService,
    public alertController: AlertController,
    // private storage: NativeStorage,

  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      number: ['', Validators.required],
      password: ['', Validators.required],
      remindMe: null
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
    this.checkUser(this.loginForm);
  }

  checkUser(userDetails) {
    let selctedUser;
    let userExist = false;
    this.authService.checkUser().subscribe(allUser => {
      for (let i = 0; i < allUser.length; i++) {
        if (allUser[i]['number'] === userDetails.value.number) {
          userExist = true;
          selctedUser = allUser[i]['password'] ;
          // this.storage.setItem('username', allUser[i]['username'])
          // .then(
          //   () => console.log('Stored item!'),
          //   error => console.error('Error storing item', error)
          // );
          localStorage.setItem('username', allUser[i]['username']);          
          break;
        }
      }
      if (userExist) {
        if (selctedUser === userDetails.value.password) {
          this.dismissLogin();
          this.navCtrl.navigateRoot('/dashboard');
        } else {
          this.alertService.presentToast('Invalid password');        
        }
      } else {
        this.conformationRegistor('User is not registered Please registor first');
      }
    },
      error => {
        this.alertService.presentToast('Registration Failed please try again after some time!!!');
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
