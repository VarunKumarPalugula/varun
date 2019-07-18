import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from '../../../services/env.service';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  InvalidUser = true;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private EnvServices: EnvService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators .required],
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
    this.dismissLogin();
    this.navCtrl.navigateRoot('/dashboard');
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

  login(form: NgForm) {
    this.EnvServices.postAPIData().subscribe((response) => {
      console.log('response from post data is ', response);
    }, (error) => {
      console.log('error during post is ', error);
    });


    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.alertService.presentToast('Logged In');
      },
      error => {
        console.log(error);
      },
      () => {
        this.dismissLogin();
        this.navCtrl.navigateRoot('/dashboard');
      }
    );
  }

}
