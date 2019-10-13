import { Component, OnInit, NgZone, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, MenuController, LoadingController, Platform, NavController, ToastController, AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../../services/api.service';
import { StorageService } from '../../../services/storage.service';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.page.html',
  styleUrls: ['./create-shop.page.scss'],
})
export class CreateShopPage implements OnInit {
  createShop: FormGroup;
  submitted = false;
  uploadedFile: string;
  number: any;
  validNumber: any;
  deleteToken: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private http: HttpClient,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.createShop = this.formBuilder.group({
      shopImage: ['', Validators.required],
      shopName: ['', Validators.required],
      number: [''],
      perferredNumber: ['', Validators.required],
      alternativeNumber: [''],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: [''],
      shopType: ['', Validators.required],
      notes: [''],
      homeDelivery: [false, Validators.required]
    });
    this.storageService.getItem('userDetails').then(details => {
      this.createShop.controls['number'].setValue(JSON.parse(details).number);
    });
  }

  getImages() {
    let url = "http://res.cloudinary.com/ddnqswqbt/image/upload/v1566888300/angular_sample/bsu37htkqgvzassdcqai.jpg";
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers: headers };
    this.http.get(url).subscribe(response => {
      console.log(response);
    });
  }

  numberValidation() {
    this.number = true;
    if (this.createShop.get('perferredNumber').value !== null) {
      if ((this.createShop.get('perferredNumber').value).toString().length != 10) {
        this.validNumber = 'INVALID';
      } else {
        this.validNumber = 'VALID';
        this.number = false;
      }
    } else {
      this.validNumber = 'VALID';
    }
  }

  back() {
    this.deleteImage()
  }

  deleteImage = function () {
    const url = `https://api.cloudinary.com/v1_1/ddnqswqbt/delete_by_token`;
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers: headers };
    const body = {
      token: this.deleteToken.delete_token
    };
    this.http.post(url, body, options).subscribe(response => {
      console.log(`Deleted image - ${this.deleteToken.public_id} ${response.result}`);
    });
  };

  getUploadedImage(image) {
    console.log(image);
    this.createShop.controls['shopImage'].setValue(image.secure_url);
    if (!isNullOrUndefined(this.deleteToken)) {
      this.deleteImage();
    }
    this.deleteToken = image;
  }


  getFileProperties(fileProperties: any) {
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties)
      .map((key) => ({ 'key': key, 'value': fileProperties[key] }));
  }

  get input(): any {
    return this.createShop.controls;
  }

  createShopFunc() {
    this.submitted = true;
    if (this.createShop.invalid) {
      return;
    }
    this.apiService.saveData(this.createShop.value, 'shopDetails').subscribe(res => {
      console.log(res)
      this.storageService.addItem('userDetails', JSON.stringify(res));

      this.navCtrl.navigateRoot('/dashboard-tabs/dashboard');
    });
  }

}
