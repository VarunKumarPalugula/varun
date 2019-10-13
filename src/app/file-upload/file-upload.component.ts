import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  uploader: FileUploader;
  uploadedFile: string;
  @Output() emitImage = new EventEmitter();
  uploadedImage: any;

  constructor(
    private zone: NgZone,
    private commonService: CommonService
  ) {


  }



  ngOnInit() {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/ddnqswqbt/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', 'h2lzx6hp');
      let tags = 'myphotoalbum';
      form.append('folder', 'angular_sample');
      form.append('tags', tags);
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    const upsertResponse = fileItem => {
      this.zone.run(() => {
        console.log(fileItem);

        if (fileItem.status === 200) {
          this.uploadedImage = fileItem.data.url;
          this.emitImage.emit(fileItem.data);
          // this.commonService.dismissLoading();
        }



        // const existingId = this.responses.reduce((prev, current, index) => {
        //   if (current.file.name === fileItem.file.name && !current.status) {
        //     return index;
        //   }
        //   return prev;
        // }, -1);
        // if (existingId > -1) {
        //   this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        // } else {
        //   this.responses.push(fileItem);
        // }
      });
    };

    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => upsertResponse({
      file: item.file,
      status,
      data: JSON.parse(response)
    });

    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      console.log(fileItem)
      // this.commonService.presentLoading('uploading image');
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );
    }
  }



  // getImages() {
  //   let url = "http://res.cloudinary.com/ddnqswqbt/image/upload/v1566888300/angular_sample/bsu37htkqgvzassdcqai.jpg";
  //   const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
  //   const options = { headers: headers };
  //   this.http.get(url).subscribe(response => {
  //     console.log(response);
  //   });
  // }
}
