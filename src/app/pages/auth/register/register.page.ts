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
  topics: any;

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
    this.apiService.getAllData('topics').subscribe(res => {
      console.log(res)
      this.topics = res;
    })
  }

  ngOnInit() {
    this.registorForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      topic: ['']
    });
  }

  topicCheck(i) {
    this.topics[i]['checked'] = !this.topics[i]['checked'];
      
  }

  numberValidation() {
    this.validNumber = this.commonService.numberValid(this.registorForm.get('number').value);
  }

  onSubmit(): boolean {
    if (this.registorForm.invalid || this.validNumber == 'INVALID') {
      this.commonService.presentToast('Please check your login details');
      return;
    }
    this.checkUser();
  }

  checkUser() {
    let topic = []
    this.topics.filter((item) => {
      if(item.checked)
      topic.push(item.topic)
    }); 
    this.registorForm.patchValue({
      topic: topic, 
    });

    this.commonService.presentLoading('User login...');
    this.apiService.find({ number: this.registorForm.get('number').value }, 'user').subscribe(res => {
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
    var registerId;
    this.apiService.saveData(this.registorForm['value'], 'user').subscribe((res) => {
      registerId = res;
      this.apiService.ccAddUser(this.registorForm.get('number').value, this.registorForm.get('username').value).subscribe(res => {
        let ccData = JSON.parse(res);
        if (ccData.error) {

          this.apiService.deleteUser('user', registerId['_id']).subscribe(res => {

            this.commonService.presentToast('Registration Failed please try again after some time!!!');

          });

        } else {
          this.commonService.dismissLoading();
          this.commonService.presentToast(`User Successfully Registered using this number ${this.registorForm.get('number').value}`);
          this.dismissRegister();
        }
      }, error => {
        this.commonService.dismissLoading();
        this.commonService.presentToast('Registration Failed please try again after some time!!!');
      });

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
