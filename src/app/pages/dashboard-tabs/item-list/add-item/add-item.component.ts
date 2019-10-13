import { Component, OnInit, NgZone, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { ModalController, MenuController, LoadingController, Platform, NavController, ToastController, AlertController } from '@ionic/angular';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  deleteToken: any;
  newItem: FormGroup;
  submitted = false;
  item: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private navCtrl: NavController,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private zone: NgZone,
    private http: HttpClient,
    private modalController: ModalController,

  ) { }

  ngOnInit() {
    this.newItem = this.formBuilder.group({
      itemImage: ['', Validators.required],
      itemName: ['', Validators.required],
      quality: ['', Validators.required],
      rate: ['', Validators.required],
      itemAvalible: [false, Validators.required],
      notes: [''],
    });
    if (this.item != undefined) {
      this.newItem.patchValue({
        itemImage: this.item.itemImage,
        itemName: this.item.itemName,
        quality: this.item.quality,
        rate: this.item.rate,
        itemAvalible: this.item.itemAvalible,
        notes: this.item.notes,
      })
    }
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
    this.newItem.controls['itemImage'].setValue(image.secure_url);
    if (!isNullOrUndefined(this.deleteToken)) {
      this.deleteImage();
    }
    this.deleteToken = image;
  }

  addNewItem() {
    this.submitted = true;
    if (this.newItem.invalid) {
      return;
    }
    console.log(this.newItem)
    this.apiService.saveData(this.newItem.value, 'addItem').subscribe(res => {
      this.modalController.dismiss();
    });
  }


}
