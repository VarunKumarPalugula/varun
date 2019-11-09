import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavController, AlertController } from '@ionic/angular';
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
  ) {
  }

  ngOnInit() {
    this.registorForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  numberValidation() {
    this.validNumber = this.commonService.numberValid(this.registorForm.get('number').value);
  }

  onSubmit(): boolean {
    if (this.registorForm.invalid || this.validNumber == 'INVALID') {
      this.commonService.presentToast('Please check your login details');
      return;
    }
    this.checkUser(this.registorForm);
  }

  checkUser(userDetails) {
    this.commonService.presentLoading('registering user...');
        this.apiService.find( { number: this.registorForm.get('number').value }, 'user').subscribe(res => {
        if (res.length === 0) {
          this.register();
        } else {
          this.commonService.dismissLoading();
          this.commonService.presentToast('user allready registored please login');
        }
      },
        error => {
          this.commonService.dismissLoading();
          this.commonService.presentToast('Registration Failed please try again after some time!!!');
        })

  }


  register() {
      this.apiService.saveData(this.registorForm['value'], 'user').subscribe((data) => {
        this.commonService.dismissLoading();
        this.commonService.presentToast(`User Successfully Registered using this number ${data.number}`);
        this.dismissRegister();
      }, error => {
          this.commonService.dismissLoading();
          this.commonService.presentToast('Registration Failed please try again after some time!!!');
        });
  }

 

  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }

}
